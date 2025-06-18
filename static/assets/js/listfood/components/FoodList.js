function FoodList() {
    return React.createElement(
        "main",
        { className: "py-12 bg-gray-50" },
        React.createElement(
            "div", 
            { className: "container mx-auto px-6 max-w-3xl" },
            React.createElement(
                "section", 
                { className: "text-center mb-12" },
                React.createElement("h1", { className: "text-3xl font-bold text-blue-700" }, "Explore Indonesian Dishes"),
                React.createElement("p", { className: "text-lg text-gray-600" }, 
                    "Browse nutrition info, food groups, and photos of authentic Indonesian foods. Select a category below."
                )
            ),
            React.createElement(FoodCategories, null)
        )
    );
}

function FoodCategories() {
    return React.createElement(
        "section",
        { className: "space-y-8" },
        React.createElement(
            "div", 
            { className: "flex flex-wrap gap-6" },
            createCategoryCard("Meat & Poultry", "Fried Chicken, Grilled Chicken, Rendang", "meat.jpg"),
            createCategoryCard("Fish & Seafood", "Grilled Fish, Fried Fish", "fish.jpg"),
            createCategoryCard("Rice & Noodles", "Fried Rice, Yellow Rice, Noodles", "pasta_rice.jpg"),
            createCategoryCard("Vegetables", "Stir-fried Water Spinach, Cabbage", "vegetables.jpg")
        ),
        React.createElement(
            "div", 
            { className: "flex flex-wrap gap-6" },
            createCategoryCard("Egg Dishes", "Omelette, Fried Egg, Boiled Egg", "eggs.jpg"),
            createCategoryCard("Tofu & Tempeh", "Fried Tofu, Tempeh", "beans_legumes.jpg"),
            createCategoryCard("Snacks & Breads", "Donut, Martabak, Perkedel", "snacks.jpg"),
            createCategoryCard("Soups & Others", "Meatball Soup, Vegetable Soup", "soups.jpg")
        ),
        React.createElement(
            "div", 
            { className: "flex flex-wrap gap-6" },
            createCategoryCard("Beverages", "Water, Tea, Coffee", "beverages.jpg"),
            createCategoryCard("Desserts & Sambal", "Pudding, Potato Sambal", "sweets_desserts.jpg")
        )
    );
}

function createCategoryCard(title, items, image) {
    return React.createElement(
        "div",
        { className: "w-full sm:w-1/2 lg:w-1/4 p-4 bg-white rounded-lg shadow-md" },
        React.createElement("img", { src: `https://m.ftscrt.com/static/images/food_groups/${image}`, alt: title, className: "w-full h-48 object-cover rounded-md" }),
        React.createElement(
            "div", 
            { className: "mt-4" },
            React.createElement("h3", { className: "text-lg font-semibold text-blue-600" }, title),
            React.createElement("p", { className: "text-sm text-gray-500" }, items)
        )
    );
}
