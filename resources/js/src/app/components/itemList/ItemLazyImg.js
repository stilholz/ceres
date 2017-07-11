Vue.component("item-lazy-img", {

    props: [
        "imageUrl",
        "template"
    ],

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        setTimeout(() =>
        {
            $(this.$els.lazyImg).show().lazyload({threshold : 100});
        }, 1);
    }
});
