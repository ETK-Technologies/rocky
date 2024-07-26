(function ($, window, document) {
  "use strict";
  var $window = $(window),
    $body = $("body"),
    $offCanvasEl = $("#slide-out-widget-area"),
    $offCanvasBG = $("#slide-out-widget-area-bg"),
    $headerOuterEl = $("#header-outer"),
    $headerSecondaryEl = $("#header-secondary-outer"),
    $searchButtonEl = $("#header-outer #search-btn a"),
    $wpAdminBar = $("#wpadminbar"),
    $loadingScreenEl = $("#ajax-loading-screen"),
    $bodyBorderTop = $(".body-border-top"),
    $pageHeaderBG = $("#page-header-bg"),
    $footerOuterEl = $("#footer-outer"),
    $bodyBorderWidth =
      $(".body-border-right").length > 0 ? $(".body-border-right").width() : 0,
    $logoHeight = $headerOuterEl.is("[data-logo-height]")
      ? parseInt($headerOuterEl.attr("data-logo-height"))
      : 30,
    headerPadding = $headerOuterEl.is("[data-padding]")
      ? parseInt($headerOuterEl.attr("data-padding"))
      : 28,
    logoShrinkNum = $headerOuterEl.is("[data-shrink-num]")
      ? $headerOuterEl.attr("data-shrink-num")
      : 6,
    condenseHeaderLayout = $headerOuterEl.is('[data-condense="true"]')
      ? true
      : false,
    usingLogoImage = $headerOuterEl.is('[data-using-logo="1"]') ? true : false,
    headerResize = $headerOuterEl.is('[data-header-resize="1"]') ? true : false,
    headerTransparent = $headerOuterEl.is('[data-transparent-header="true"]')
      ? true
      : false,
    headerMobileFixed = $headerOuterEl.is('[data-mobile-fixed="1"]')
      ? true
      : false,
    headerLayoutFormat = $body.is("[data-header-format]")
      ? $body.attr("data-header-format")
      : "default",
    headerHideUntilNeeded = $body.is("[data-hhun]")
      ? $body.attr("data-hhun")
      : "",
    $animationEasing =
      $body.is("[data-cae]") && $body.attr("data-cae") !== "swing"
        ? $body.attr("data-cae")
        : "easeOutCubic",
    $animationDuration = $body.is("[data-cad]")
      ? $body.attr("data-cad")
      : "650",
    bypassAnimations =
      !$body.is('[data-m-animate="1"]') &&
      navigator.userAgent.match(
        /(Android|iPod|iPhone|iPad|BlackBerry|IEMobile|Opera Mini)/
      )
        ? true
        : false,
    $portfolio_containers = [],
    $svgIcons = [],
    $nectarCustomSliderRotate = [],
    $flickitySliders = [],
    flickityDragArr = [],
    viewIndicatorArr = [],
    iconMouseFollowArr = [],
    postGridImgMouseFollowArr = [],
    parallaxItemsArr = [],
    $fsProjectSliderArr = [],
    $wooFlickityCarousels = [],
    $liquidBG_EL = [],
    $testimonialSliders = [],
    $mouseParallaxScenes = [],
    $nectarMasonryBlogs = [],
    $standAnimatedColTimeout = [],
    $animatedSVGIconTimeout = [],
    $projectCarouselSliderArr = [],
    $nectarPostGridArr = [],
    $verticalScrollingTabs = [],
    $tabbedClickCount = 0,
    $fullscreenSelector = "",
    $fullscreenMarkupBool = false,
    $bodyBorderHeaderColorMatch = false,
    nectarBoxRoll = {
      animating: "false",
      perspect: "not-rolled",
    },
    $nectarFullPage = {
      $usingFullScreenRows: false,
    },
    $svgResizeTimeout,
    $bodyBorderSizeToRemove;
  if ($bodyBorderTop.length > 0) {
    if (
      ($bodyBorderTop.css("background-color") == "#ffffff" &&
        $body.attr("data-header-color") == "light") ||
      ($bodyBorderTop.css("background-color") == "rgb(255, 255, 255)" &&
        $body.attr("data-header-color") == "light") ||
      $bodyBorderTop.css("background-color") ==
        $headerOuterEl.attr("data-user-set-bg")
    ) {
      $bodyBorderHeaderColorMatch = true;
    }
  }
  var nectarDOMInfo = {
    usingMobileBrowser: navigator.userAgent.match(
      /(Android|iPod|iPhone|iPad|BlackBerry|IEMobile|Opera Mini)/
    )
      ? true
      : false,
    usingFrontEndEditor: typeof window.vc_iframe === "undefined" ? false : true,

    scrollTop: 0,
    clientX: 0,
    clientY: 0,
  };
  window.nectarDOMInfo = nectarDOMInfo;
  var nectarState = {
    materialOffCanvasOpen: false,
    materialSearchOpen: false,
    permanentTransHeader: $headerOuterEl.is('[data-permanent-transparent="1"]')
      ? true
      : false,
    animatedScrolling: false,
    preventScroll: false,
    mobileHeader: "",
  };
})(window.jQuery, window, document);
