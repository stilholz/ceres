var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

import UrlService from "services/UrlService";

Vue.component("item-search", {

    props: [
        "template"
    ],

    data()
    {
        return {
            searchString: "",
            itemSearch: {}
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        ResourceService.bind("itemSearch", this);
        this.initAutocomplete();

        const urlParams = UrlService.getUrlParams(document.location.search);

        this.itemSearch.query = urlParams.query;

        if (this.itemSearch.query)
        {
            ItemListService.updateSearchString(this.itemSearch.query);
        }
    },

    methods:
    {
        search()
        {
            if (document.location.pathname === "/search")
            {
                ItemListService.setSearchString(this.itemSearch.query);
                ItemListService.getItemList();
            }
            else
            {
                window.open("/search?query=" + this.itemSearch.query, "_self", false);
            }
        },

        initAutocomplete()
        {
            $(".search-input").autocomplete({
                serviceUrl: "/rest/io/item/search/autocomplete",
                paramName: "query",
                params: {template: "Ceres::ItemList.Components.ItemSearch", variationShowType: App.config.variationShowType},
                width: $(".search-box-shadow-frame").width(),
                zIndex: 1070,
                maxHeight: 310,
                minChars: 2,
                preventBadQueries: false,
                onSelect: suggestion =>
                {
                    this.itemSearch.query = suggestion.value;
                    this.search();
                },
                beforeRender: () =>
                {
                    $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
                },
                transformResult: response =>
                {
                    return this.transformSuggestionResult(response);
                }
            });

            $(window).resize(() =>
            {
                $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
            });
        },

        transformSuggestionResult(result)
        {
            result = JSON.parse(result);
            const suggestions =
                {
                    suggestions: $.map(result.data.documents, dataItem =>
                    {
                        const value = this.$options.filters.itemName(dataItem.data.texts, window.App.config.itemName);

                        return {
                            value: value,
                            data : value
                        };
                    })
                };

            return suggestions;
        }
    }
});
