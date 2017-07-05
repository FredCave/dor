<?php get_header(); ?>

<body>

<div id="space"></div>

<script>

$(document).ready( function(){

    // SHOW / HIDE LAYERS  
    $(".button").on("click", function(){

        if ( $(this).attr("id") === "button_1" ) {

            if ( $(this).hasClass("visible") ) {
                scene.children[2].visible = false;
                $(this).removeClass("visible");
            } else {
                scene.children[2].visible = true; 
                $(this).addClass("visible");                
            }

        } else if ( $(this).attr("id") === "button_2" ) {

            if ( $(this).hasClass("visible") ) {
                scene.children[3].visible = false;
                $(this).removeClass("visible");
            } else {
                scene.children[3].visible = true;   
                $(this).addClass("visible");            
            }

        }

    });   

});


</script>

    <div id="buttons">
        <div id="button_1" class="button visible">1</div>
        <div id="button_2" class="button visible">2</div>
    </div>

</body>

<?php get_footer(); ?>