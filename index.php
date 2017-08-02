<?php get_header(); ?>

<body>

    <div id="space"></div>

    <div id="buttons_wrapper">

        <div id="buttons_toggle">Hide Controls</div>

        <ul id="buttons"></ul>

    </div>

    <div id="tooltip"></div>

    <audio id="main_audio">
		<source src="<?php bloginfo('template_url'); ?>/assets/audio/EVEN_MAIN_LQ2.mp3" type="audio/mpeg">
    </audio>

    <audio id="loop_audio_1">
		<source src="<?php bloginfo('template_url'); ?>/assets/audio/EVEN_ENDLOOP_LQ.mp3" type="audio/mpeg">
    </audio>

    <audio id="loop_audio_2">
		<source src="<?php bloginfo('template_url'); ?>/assets/audio/EVEN_ENDLOOP_LQ.mp3" type="audio/mpeg">
    </audio>

</body>

<?php get_footer(); ?>