// init controller
var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

// build scenes
new ScrollMagic.Scene({triggerElement: "#parallax-01"})
        .setTween("#parallax-01 > div", {y: "80%", ease: Linear.easeNone})
        //.addIndicators()
        .addTo(controller);

