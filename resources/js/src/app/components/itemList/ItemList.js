var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    props: [
        "categoryId",
        "template"
    ],

    data()
    {
        return {
            itemList: {},
            isLoading: false,
            filterListState: false
        };
    },

    created()
    {
        this.$options.template = this.template;

        ItemListService.setCategoryId(this.categoryId);
    },

    ready()
    {
        ResourceService.bind("itemList", this);
        ResourceService.bind("isLoading", this);
    }
});
