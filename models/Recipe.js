class Recipe {
    constructor(
        id,
        mainCollectionId,
        title,
        description,
        ingredients,
        directions,
        categories,
        servings,
        notes,
        preparationTime,
        cookTime,
        rating,
        isVegan,
        isVegetarian,
        isGlutenFree,
        isDairyFree,
        photos,
        groupName
        ) {
        this.id = id;
        this.mainCollectionId = mainCollectionId;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.directions = directions;
        this.categories = categories;
        this.servings = servings;
        this.notes = notes;
        this.preparationTime = preparationTime;
        this.cookTime = cookTime;
        this.rating = rating;
        this.isVegan = isVegan;
        this.isVegetarian = isVegetarian;
        this.isGlutenFree = isGlutenFree;
        this.isDairyFree = isDairyFree;
        this.photos = photos;
        this.groupName = groupName;
    }
}

export default Recipe;
