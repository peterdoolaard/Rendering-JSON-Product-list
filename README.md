# Rendering a JSON product list

POC for rendering a product list from a JSON file with vanilla HTML, CSS and JavaScript

The items have to be sorted by model family. Therefor the JSON data is being transformed to an array of model family objects. Each object in the array holds the model family and a list of item objects belonging to that model family.

Items without model family should be displayed at the bottom of the list with a label 'No family'.

The HTML list gets dynamically rendered by creating new nodes and appending them to the list.

The process involves these steps:

1. Fetch the JSON data or display an error page.
2. Transform the data.
3. Sort the resulting array by model family.
4. Create the ul element and create and append the li element holding the column headings.
5. Iterate the families array. For each object display the name and iterate the item object(s). Create and append nodes to add these to the HTML list.
6. Find all products with an empty model family and append them again to move these items to the bottom of the list.
7. A CSS class adds 'No family' to these empty items.
