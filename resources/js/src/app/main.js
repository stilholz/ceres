// Frontend end scripts
// eslint-disable-next-line
var init = (function($, window, document)
{

    function CeresMain()
    {
        // init bootstrap tooltips
        $("[data-toggle=\"tooltip\"]").tooltip();

        // Sticky sidebar single item
        if (window.matchMedia("(min-width: 768px)").matches)
        {
            var $singleRightside = $(".single-rightside");
            var $headHeight = $(".top-bar").height();

            $singleRightside.stick_in_parent({offset_top: $headHeight + 10});

            $singleRightside.on("sticky_kit:bottom", function()
            {
                $(this).parent().css("position", "static");
            })
                .on("sticky_kit:unbottom", function()
                {
                    $(this).parent().css("position", "relative");
                });
        }

        var $toggleListView = $(".toggle-list-view");

        setTimeout(function()
        {
            var $toggleBasketPreview = $("#toggleBasketPreview, #closeBasketPreview");

            $toggleBasketPreview.on("click", function(evt)
            {
                evt.preventDefault();
                evt.stopPropagation();
                $("body").toggleClass("open-right");
            });
        }, 1);

        $(document).on("click", "body.open-right", function(evt)
        {
            if ($("body").hasClass("open-right"))
            {
                if ((evt.target != $(".basket-preview")) && ($(evt.target).parents(".basket-preview").length <= 0))
                {
                    evt.preventDefault();
                    $("body").toggleClass("open-right");
                }
            }
        });

        $("#to-top").on("click", function()
        {
            $("html, body").animate({scrollTop: 0}, "slow");
        });

        $("#searchBox").on("show.bs.collapse", function()
        {
            $("#countrySettings").collapse("hide");
        });

        $("#countrySettings").on("show.bs.collapse", function()
        {
            $("#searchBox").collapse("hide");
        });

        $toggleListView.on("click", function(evt)
        {
            evt.preventDefault();

            // toggle it's own state
            $toggleListView.toggleClass("grid");

            // toggle internal style of thumbs
            $(".product-list, .cmp-product-thumb").toggleClass("grid");
        });

        $(document).ready(function()
        {
            var offset = 250;
            var duration = 300;

            $(window).scroll(function()
            {
                if ($(this).scrollTop() > offset)
                {
                    $(".back-to-top").fadeIn(duration);
                    $(".back-to-top-center").fadeIn(duration);
                }
                else
                {
                    $(".back-to-top").fadeOut(duration);
                    $(".back-to-top-center").fadeOut(duration);
                }
            });

            $(".back-to-top").click(function(event)
            {
                event.preventDefault();

                $("html, body").animate({scrollTop: 0}, duration);

                return false;
            });

            $(".back-to-top-center").click(function(event)
            {
                event.preventDefault();

                $("html, body").animate({scrollTop: 0}, duration);

                return false;
            });
        });
    }

    window.CeresMain = new CeresMain();

})(jQuery, window, document);
