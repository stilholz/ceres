var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

import UrlService from "services/UrlService";

Vue.component("items-per-page", {

    props: [
        "columnsPerPage",
        "rowsPerPage",
        "template"
    ],

    data()
    {
        return {
            itemSearch: {},
            paginationValues: []
        };
    },

    created()
    {
        this.$options.template = this.template;

        ResourceService.bind("itemSearch", this);

        this.initPaginationValues();
        this.setSelectedValueByUrl();
    },

    methods:
    {
        itemsPerPageChanged()
        {
            ItemListService.setItemsPerPage(this.itemSearch.items);
            ItemListService.setPage(1);
            ItemListService.getItemList();
        },

        setSelectedValueByUrl()
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            if (urlParams.items && this.paginationValues.indexOf(urlParams.items) > -1)
            {
                this.itemSearch.items = urlParams.items;
            }
            else
            {
                this.itemSearch.items = App.config.defaultItemsPerPage;
            }

            ItemListService.setItemsPerPage(this.itemSearch.items);
        },

        initPaginationValues()
        {
            for (const rowKey in this.rowsPerPage)
            {
                this.paginationValues.push(this.rowsPerPage[rowKey] * this.columnsPerPage);
            }
        }
    }
});
