class Group {
    constructor(
        id,
        mainCollectionId,
        groupName,
        recipes,
        members
    ) {
        this.id = id;
        this.mainCollectionId = mainCollectionId;
        this.groupName = groupName;
        this.recipes = recipes;
        this.member = members;
    }
}

export default Group;
