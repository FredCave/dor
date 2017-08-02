<?php

// SECURITY: HIDE USERNAMES
add_action(‘template_redirect’, ‘bwp_template_redirect’);
function bwp_template_redirect() {
    if ( is_author() ) {
        wp_redirect( home_url() ); 
        exit;
    }
}

// HIDE VERSION OF WORDPRESS
function wpversion_remove_version() {
        return '';
    }
add_filter('the_generator', 'wpversion_remove_version');

// REMOVE DASHICONS
function wpdocs_dequeue_dashicon() {
    // if (current_user_can( 'update_core' )) {
    //     return;
    // }
    wp_deregister_style('dashicons');
}
add_action( 'wp_enqueue_scripts', 'wpdocs_dequeue_dashicon' );

// REMOVE EMOJIS
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

// ENQUEUE CUSTOM SCRIPTS
function enqueue_palimpsest_scripts() {
  
    wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
    wp_enqueue_script( 'jquery' );  
 
}
add_action('wp_enqueue_scripts', 'enqueue_palimpsest_scripts');

// ADD CUSTOM POST TYPES
add_action( 'init', 'create_post_types' );
function create_post_types() {
    register_post_type( 'cubes',
    array(
        'labels' => array(
            'name' => __( 'Cubes' )
        ),
        'public' => true,
        'show_in_rest' => true,
        'taxonomies' => array('category','post_tag'),
        'has_archive' => true,
        'supports' => array('editor','title'),
        'menu_position' => 5
        )
    );
}

// ADD CUSTOM IMAGE SIZES
add_theme_support( 'post-thumbnails' );
add_image_size( 'extralarge', 1020, 1020 );
add_image_size( 'ultralarge', 1600, 1600 );

// END POINTS

function get_cubes () {
    $args = array(
        "post_type"         => "cubes",
        "posts_per_page"    => -1,
        "order"             => "asc"
    );
    $query = new WP_Query( $args );
    $data = array();
    // LOOP THROUGH CUBES
    if ( $query->have_posts() ) :
        $i = 1;
        while ( $query->have_posts() ) : $query->the_post(); 

            // NEW CUBE ARRAY
            $cube["cube-" . $i] = array();

            // LOOP THROUGH LAYERS
            if ( have_rows("layers") ) {
                
                $j = 1;
                
                while ( have_rows("layers") ) : the_row();  

                    // NEW LAYER ARRAY 
                    $layer["layer-" . $j] = array();        

                        // ORDER USED IN JS CODE
                        // ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
                        $layer["layer-" . $j]["ID"]        = get_sub_field("layer_id");
                        $layer["layer-" . $j]["name"]      = get_sub_field("layer_name");

                        // LOOP THROUGH IMAGES
                        $layer["layer-" . $j]["east"]      = get_sub_field("layer_east"); // POSX
                        $layer["layer-" . $j]["west"]      = get_sub_field("layer_west"); // NEGX
                        $layer["layer-" . $j]["top"]       = get_sub_field("layer_top"); // POSY
                        $layer["layer-" . $j]["bottom"]    = get_sub_field("layer_bottom"); // NEGY
                        $layer["layer-" . $j]["north"]     = get_sub_field("layer_north"); // POSZ
                        $layer["layer-" . $j]["south"]     = get_sub_field("layer_south"); // NEGZ
                        
                    // PUSH LAYER TO CUBE
                    array_push( $cube["cube-" . $i], $layer["layer-" . $j] );
                    $j++;

                endwhile;

            }

            // PUSH CUBE TO ARRAY
            array_push( $data, $cube["cube-" . $i] );
            $i++;

        endwhile;
        wp_reset_postdata();
    endif;
    // RETURN DATA
    if ( empty( $data ) ) {
        return null;
    }    
    return $data;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'custom/v1', '/cubes/', array(
        'methods' => 'GET',
        'callback' => 'get_cubes',
    ) );
} );



?>