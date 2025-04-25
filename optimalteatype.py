# import statements
import json
import csv
import networkx as nx
import matplotlib.pyplot as plt


class MyGraph:

    def __init__(self):
        self.G = nx.Graph()
    
    # for one health concern
    def recommend_tea_for_health(self, health_concern, max_results=5):
        health_node = self.find_closest_node(health_concern)
        
        if not health_node or self.G.nodes[health_node].get("type") != "health":
            print(f"No matching health concern found for '{health_concern}'.")
            return []

        # Find all teas connected to this health node
        recommended_teas = []
        for node in self.G.nodes:
            if self.G.nodes[node].get("type") == "tea":
                try:
                    path = nx.shortest_path(self.G, source=health_node, target=node)
                    recommended_teas.append((node, path))
                except nx.NetworkXNoPath:
                    continue

        # Sort by shortest path length
        recommended_teas.sort(key=lambda x: len(x[1]))

        if not recommended_teas:
            print(f"No teas found connected to '{health_concern}'.")
        else:
            print(f"Recommended teas for '{health_concern}':")
            for tea, path in recommended_teas[:max_results]:
                print(f"{tea.title()} (Path: {' ➝ '.join(path)})")

        return [tea for tea, _ in recommended_teas[:max_results]]
    
    # my graph
        
    def build_graph(self, data, benefit_data):

        for category, info in data.items():
            if isinstance(info, dict) and "types" in info:
                category_name = category.strip().lower()
                self.G.add_node(category_name, type="category")
                for tea_key, tea_data in info["types"].items():
                    tea_name = tea_data.get("name", tea_key).strip().lower()
                    self.G.add_node(
                        tea_name,
                        type="tea",
                        caffeine=tea_data.get("caffeine", "N/A"),
                        origin=tea_data.get("origin", "Unknown"),
                        taste=tea_data.get("tasteDescription", "N/A")
                    )
                    self.G.add_edge(category_name, tea_name)

                    # Handle other attributes like taste and health benefits
                    taste = tea_data.get("tasteDescription")
                    if taste:
                        for flavor in [f.strip() for f in taste.split(",")]:
                            self.G.add_node(flavor, type="taste")
                            self.G.add_edge(tea_name, flavor)

                    # Health
                    for benefit in tea_data.get("healthBenefits", []):
                        benefit = benefit.strip().lower()
                        self.G.add_node(benefit, type="health")
                        self.G.add_edge(tea_name, benefit)
                

        for row in benefit_data:
            teas = [t.strip().lower() for t in row["Tea Type"].split(",")]
            benefits = [b.strip().lower() for b in row["Health Benefit"].split(",")]

            for tea in teas:
                self.G.add_node(tea, type="tea")
                for benefit in benefits: 
                    self.G.add_node(benefit, type="health")
                    self.G.add_edge(tea, benefit)

        print(list(self.G.neighbors("green teas")))
        # Should show all green teas

        for tea in self.G.neighbors("green teas"):
            if nx.has_path(self.G, "anti-anxiety effects", tea):
                print(tea, "is linked to 'anti-anxiety effects'")
                print(self.G.nodes["white tea"])
                print(self.G.nodes["green tea"])




    # find closest node 
    def find_closest_node(self, keyword):
        keyword = keyword.lower()
        for node in self.G.nodes:
            if keyword == node.lower():
                return node
        for node in self.G.nodes:
            if keyword in node.lower():
                return node
        return None

    # find closest tea node
    
    def find_closest_tea_node(self, tea_name):
        tea_name_lower = tea_name.lower()
        matches = [
            node for node in self.G.nodes
            if tea_name_lower in node
            and self.G.nodes[node].get("type") in ["tea", "category"]
        ]
        return matches[0] if matches else None

    # find shortest path between 2 teas
    
    def find_shortest_paths(self, health_concern, tea_options):
        
        print(f"\nFinding teas for: {health_concern}")

        health_concern_node = self.find_closest_node(health_concern)
        if not health_concern_node:
            print(f"Health concern '{health_concern}' not found in the graph.")
            return

        for tea in tea_options:
            tea_node = self.find_closest_tea_node(tea)
            tea_nodes = []
            if tea_node and self.G.nodes[tea_node].get("type") == "category":
                tea_nodes = self.get_teas_from_category(tea_node)
                if not tea_nodes:
                    print(f"No teas found in category '{tea_node}'")
                    continue
            else:
                tea_nodes = [tea_node]

            found_path = False
            for actual_tea in tea_nodes:
                if actual_tea not in self.G:
                    continue
                try:
                    path = nx.shortest_path(self.G, source=health_concern_node, target=actual_tea)
                    print(f"Shortest path from '{health_concern}' to '{actual_tea}': {path}")
                    found_path = True
                except nx.NetworkXNoPath:
                    continue

            if not found_path:
                print(f"No path between '{health_concern}' and '{tea}'")
    
    # get a tea based on category
    
    def get_teas_from_category(self, category_name):
        category_node = self.find_closest_node(category_name)
        if category_node and self.G.nodes[category_node]["type"] == "category":
            # Return all direct neighbors of the category that are teas
            return [
                n for n in self.G.neighbors(category_node)
                if self.G.nodes[n].get("type") == "tea"
            ]
        return []
    
    # get a tea by characteristic
    
    def explore_tea_by_characteristic(self, keyword):
        keyword = keyword.lower()
        matches = []

        for node in self.G.nodes:
            node_type = self.G.nodes[node].get("type")
            if keyword in node.lower() and node_type in ["taste", "origin", "caffeine", "health"]:
                teas = [
                    tea for tea in self.G.neighbors(node)
                    if self.G.nodes[tea].get("type") == "tea"
                ]
                if teas:
                    matches.append((node, teas))

        if not matches:
            print(f"No teas found matching the characteristic '{keyword}'.")
            return None
    
        recommended_teas = []
        for characteristic, teas in matches:
            for tea in teas:
                recommended_teas.append(tea)  

        return recommended_teas 

            
    # list all teas

    def list_all_teas(self):
        print("\nAll Available Teas:")
        for node in self.G.nodes:
            if self.G.nodes[node].get("type") == "tea":
                print(f"{node.title()}")

    # compare 2 teas
    def compare_teas(self, tea1, tea2, attribute):
        tea1_node = self.find_closest_tea_node(tea1)
        tea2_node = self.find_closest_tea_node(tea2)

        if not tea1_node or not tea2_node:
            print("Could not find both tea types in the graph.")
            return

        value1 = self.get_attribute(tea1_node, attribute)
        value2 = self.get_attribute(tea2_node, attribute)

        if value1 == "N/A" or value2 == "N/A":
            print("One or both teas do not have caffeine information.")
            return
        

        print(f"\nComparison based on '{attribute.title()}':")
        print(f"{tea1.title()}: {value1}")
        print(f"{tea2.title()}: {value2}")

        return (value1, value2)
    
    def get_attribute(self, tea_node, attribute):
        if tea_node in self.G.nodes:
            node_data = self.G.nodes[tea_node]
        
    
            if attribute == "caffeine":
                if "types" in node_data:  
                    caffeine_values = []
                    for sub_tea_name, sub_tea_data in node_data["types"].items():
                        if "caffeine" in sub_tea_data:
                            caffeine_values.append(sub_tea_data["caffeine"])

                    if caffeine_values:
                        return caffeine_values[0]  

                    return "Unknown"
                return node_data.get("caffeine", "N/A")

            return node_data.get(attribute, "N/A")
    
        return "N/A"
    
    def find_teas(self, health_concerns, taste_preference=None):
        tea_sets = []
        for concern in health_concerns:
            concern_node = self.find_closest_node(concern)
            if concern_node and self.G.nodes[concern_node].get("type") == "health":
                connected_teas = {
                    tea for tea in self.G.neighbors(concern_node)
                    if self.G.nodes[tea].get("type") == "tea"
                }
                tea_sets.append(connected_teas)

        if not tea_sets:
            print(f"No teas found for any of: {health_concerns}")
            return []

        common_teas = set.intersection(*tea_sets)
        if not common_teas:
            print(f"No teas found that help with all of: {health_concerns}")
            return []

        if taste_preference:
            matching_teas = []
            for tea in common_teas:
                taste = self.G.nodes[tea].get("taste", "").lower()
                if taste_preference.lower() in taste:
                    matching_teas.append(tea)

            if matching_teas:
                print(f"Teas for {health_concerns} with taste '{taste_preference}':")
                for t in matching_teas:
                    print(f"{t.title()}")
                return matching_teas
            else:
                print(f"Teas for {health_concerns}, but no exact taste match for '{taste_preference}':")
                for t in common_teas:
                    print(f"{t.title()}")
                return list(common_teas)
        
        print(f"Teas matching all health concerns {health_concerns}:")
        for t in common_teas:
            print(f" {t.title()}")
        return list(common_teas)


class TeaBenefits:
    def __init__(self):
        self.benefits_data = []

    def readFile(self, file):
        with open(file, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                self.benefits_data.append(row)


    def printData(self):
        for entry in self.benefits_data:
            print(f"{entry['Tea Type']} helps with {entry['Health Benefit']}")

class TeaTypes:
    def __init__(self):
        self.tea_data = {}

    def readFile(self, file):
        with open(file, 'r', encoding='utf-8') as f:
            self.tea_data = json.load(f)

    def printData(self):
        for category, info in self.tea_data.items():
            print(f"\nCategory: {category}")
            if 'types' in info:
                for tea_name, tea_info in info['types'].items():
                    print()
                    print(f"Tea: {tea_name}")
                    print(f"Origin: {tea_info.get('origin', 'Unknown')}")
                    print(f"Taste: {tea_info.get('tasteDescription', 'N/A')}")
                    print(f"Caffeine: {tea_info.get('caffeine', 'N/A')}")
            else:
                for key, value in info.items():
                    try:
                        print(f"\nTea: {value.get('name', 'Unknown')} \nOrigin: {value.get('origin', 'Unknown')} \nTaste: {value.get('tasteDescription', 'Unknown')} \nCaffeine: {value.get('caffeine', 'Unknown')}")
                    except AttributeError:
                        print(f"{key}: {value}")


if __name__ == "__main__":
    graph = MyGraph()
    with open("static/teadata.json") as f:
        data = json.load(f)
    
    with open("static/teabenefits.csv", newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        benefit_data = list(reader) 


    graph.build_graph(data, benefit_data)

    graph.compare_teas("black tea", "green tea", "caffeine")
    graph.compare_teas("assam", "darjeeling", "caffeine")

    print()

    graph.list_all_teas()

    print()

    graph.explore_tea_by_characteristic("caffeine")
    graph.explore_tea_by_characteristic("antioxidants")
    graph.explore_tea_by_characteristic("fruity")
    graph.explore_tea_by_characteristic("japan")

    print()

    graph.recommend_tea_for_health("immunity")
    graph.recommend_tea_for_health("anti-anxiety effects")
    graph.recommend_tea_for_health("digestion")

    print()

    graph.build_graph(data, benefit_data)
    graph.find_shortest_paths("anti-anxiety effects", ["green teas", "black tea", "peppermint"])
    graph.find_shortest_paths("Relieving muscle tension", ["green teas", "black tea", "peppermint"])
    graph.find_shortest_paths("antioxidants", ["white tea", "black tea", "peppermint"])

    print()
    graph.find_teas(["Reducing inflammation in the body", "Improving circulation"], taste_preference="minty")
