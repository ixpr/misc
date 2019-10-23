<section class="price"> 
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2><?=the_title();?></h2>
                <div class="blue rasp">
                    <?php
                    the_post();
					$duration = get_user_meta( $_SESSION['city_id'], 'duration', true );
					if ($duration) {
						$new_content = str_replace('90',$duration,get_the_content());
					} else {
						$new_content = get_the_content();
					}
					echo $new_content;
                    ?>
                </div>
            </div>
        </div>
        <?php 
            $day_name = array(1 => 'пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс');
            $lessons_time = lessons_time();
        ?>
        <form class="form-rasp" id="weeks">
        <div class="row">
        <?php foreach ($lessons_time as $day_key => $day_value): ?>
           <div class="col-xs-12 col-sm-6 col-md">
              <div class="weekday" id="day2019-02-12">
                 <div class="day-name"><?=$day_name[$day_key]?></div>
                 <div class="daytime">
                 <?php if (empty($day_value)): ?>
                    <span class="notime">-</span>
                 <?php else: ?>
                 <?php foreach ($day_value as $l_id => $d_time): ?>  
                    <a href="https://client.softium-deti.ru/client/addclientbook.htm?lesson=<?=$l_id?>" target="_blank"><?=$d_time?></a><br>
                 <?php endforeach; ?>
                 <?php endif; ?>
                 </div>
              </div>
           </div>
        <?php endforeach; ?>
        </div>
        </form>
        <?php
            $price1 = get_field('price1', 'user_'.$_SESSION['city_id']);
            $price4 = get_field('price4', 'user_'.$_SESSION['city_id']);
            $price8 = get_field('price8', 'user_'.$_SESSION['city_id']);
			$currency = get_field('currency', 'user_'.$_SESSION['city_id']);
            if ($price1 || $price || $price8):
        ?>
        <h1>Цены на основной курс</h1>
        <div class="row price-block">
            <div class="col-md-4">
                <?php if ($price1): ?>
                <div class="pitca">
                    <div class="icon-price"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/price-blue.png" /></div>
                    <div class="price-text">Разовое посещение
                        без покупки абонемента</div>
                    <div class="cena"><?=$price1?> <?=$currency?></div>
                </div>
                <?php endif; ?>
            </div>
            <div class="col-md-4">
                 <?php if ($price4): ?>
                <div class="pitca">
                    <div class="icon-price"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/price-green.png" /></div>
                    <div class="price-text">Абонемент на 4 занятия
                        в месяц</div>
                    <div class="cena"><?=$price4?> <?=$currency?></div>
                </div>
                <?php endif; ?>
            </div>
            <div class="col-md-4">
                 <?php if ($price8): ?>
                <div class="pitca">
                    <div class="icon-price"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/price-yellow.png" /></div>
                    <div class="price-text">Абонемент на 8 занятий
                        в месяц</div>
                    <div class="cena"><?=$price8?> <?=$currency?></div>
                </div>
                <?php endif; ?>
            </div>
        </div>
        <?php endif; ?>
    </div>
</section>


<?php $user_classid = get_user_meta( $_SESSION['city_id'], 'classId', true );

// get current time with timezone
$user_timezone = get_user_meta( $_SESSION['city_id'], 'tz', true );
$timestamp = time();
$dt = new DateTime("now", new DateTimeZone($user_timezone));
$dt->setTimestamp($timestamp);
$date_time_timezone = $dt->format("Y-m-d H:i:s");
$date_timezone = $dt->format("Ymd");

$posts = get_posts( array(
	'post_type'   => 'mclass',
	'numberposts' => -1,
	'order'       => 'ASC',
	'meta_key' 	  => 'mclass_date',
	'orderby'     => 'meta_value',
	'include'     => array(),
	'exclude'     => array(),
	'meta_query'	=> array(
		'relation'		=> 'AND',
		array(
			'key'	 	=> 'mclass_class_id',
			'value'	  	=> $user_classid,
			'compare' 	=> '=',
		),
		array(
			'key'	  	=> 'mclass_available',
			'value'	  	=> '1',
			'compare' 	=> '=',
		),
		array(
			'key' 		=> 'mclass_date',
			'value' 	=> $date_time_timezone ,
			'compare' 	=> '>=',
			'type' 		=> 'DATETIME'
		) ,
	),
) );
?>

<section class="master-classes">
	<div class="container">
		<div class="row">
			<div class="col-md-12 col-lg-11">
			
				<h2>Мастер-классы</h2>
			
				<style>
				.price .price-block {
					margin-bottom: 50px;
				}
				/*.mclasses-list .fran-text {
					background-size: auto;
					background-position: center top;
				}*/
				.master-classes {
					background-color: #ececec;
					/*background-image: url('/wp-content/themes/coding/assets/img/strach-top.jpg');
					background-repeat: no-repeat;
					background-position: top center;*/
				}
				.master-classes h2 {
					margin-top: 0px;
					font-size: 3rem;
				}
				.master-classes .fran-text {
					padding: 120px 90px 80px 90px;
					margin-top: 50px;
				}
				.prise .mclasses-list .action-form {
					padding-top: 30px;
					background: #fff;
				}
				.buy-button {
					padding-top: 30px;
				}
				@media (min-width: 400px) and (max-width: 575.98px) {	
					.prise .mclasses-list .action-form {
						background: inherit;
					}
					.master-classes .fran-text {
						padding: 30px;
					}
				}				
				@media (max-width: 399.98px) {	
					.prise .mclasses-list .action-form {
						background: inherit;
					}
					.master-classes .fran-text {
						padding: 30px;
					}
				}
				.action-form {
					padding-top: 80px;
				}
				</style>
				<div class="mclasses-list">
					
					<?php if($posts){ 
					$i=1;
					foreach( $posts as $post ){
						setup_postdata($post);
						
						$mclass_date = get_post_meta( get_the_ID(), 'mclass_date', true );
						$mclass_duration = get_post_meta( get_the_ID(), 'mclass_duration', true );
						$mclass_lessons = get_post_meta( get_the_ID(), 'mclass_lessons', true );
						$mclass_price = get_post_meta( get_the_ID(), 'mclass_price', true );
						$mclass_discount_price = get_post_meta( get_the_ID(), 'mclass_discount_price', true );
						
						if ($mclass_discount_price) {
							$mclass_discount_conditions = get_post_meta( get_the_ID(), 'mclass_discount_conditions', true );
							$mclass_discount_expiration = get_post_meta( get_the_ID(), 'mclass_discount_expiration', true );
						}
						
						$mclass_place = get_post_meta( get_the_ID(), 'mclass_place', true );
						$mclass_phone = get_post_meta( get_the_ID(), 'mclass_phone', true );
						$mclass_age = get_post_meta( get_the_ID(), 'mclass_age', true );
						$mclass_available = get_post_meta( get_the_ID(), 'mclass_available', true ); ?>
						
						<div class="row justify-content-end">
							<div class="col-md-12 col-lg-11">
								<div class="fran-text-<?php echo $i;?> fran-text animated zoomIn" style="display: block; opacity: 1;">
									<h3><?php the_title(); ?></h3>
									<div class="action-form">
										<div class="container">
											<div class="row">
												<div class="col-md-12 col-lg-12">
													<?php if ($mclass_date) { 
													$strtotime_date = strtotime($mclass_date);
													$mclass_date_formatted = date('d F Y', $strtotime_date).', '.date('H:i', $strtotime_date);
													$array_eng = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
													$array_rus = array('января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря');
													$mclass_date_formatted = str_replace($array_eng, $array_rus, $mclass_date_formatted); ?>
														<p><strong>Дата и время первого занятия:</strong> <span><?php echo $mclass_date_formatted; ?></span></p>
													<?php } ?>
													<?php if ($mclass_lessons) { ?>
														<p><strong>Количество занятий:</strong> <span><?php echo $mclass_lessons; ?></span></p>
													<?php } ?>
													<?php if ($mclass_duration) { ?>
														<p><strong>Длительность:</strong> <span><?php echo $mclass_duration; ?> минут</span></p>
													<?php } ?>
													<?php if ($mclass_price) { ?>
														<p><strong>Цена:</strong> <span><?php echo $mclass_price; ?> р.</span></p>
													<?php } ?>
													
													<?php if (($mclass_discount_conditions == '0' && $mclass_discount_expiration >= $date_timezone) || $mclass_discount_conditions == '1') : ?>
														<?php if ($mclass_discount_price) { ?>
															<p><strong>Цена со скидкой:</strong> <span><?php echo $mclass_discount_price; ?> р.</span></p>
														<?php } ?>
														<?php if ($mclass_discount_conditions == '0') { 
														$strtotime_discount_date = strtotime($mclass_discount_expiration); 
														$mclass_discount_date_formatted = date('d F Y', $strtotime_date); 
														$array_eng = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
														$array_rus = array('января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря');
														$mclass_discount_date_formatted = str_replace($array_eng, $array_rus, $mclass_discount_date_formatted); ?>
															<p><strong>Условия скидки:</strong> <span>до <?php echo $mclass_discount_date_formatted; ?></span></p>
														<?php } ?>
														<?php if ($mclass_discount_conditions == '1') { ?>
															<p><strong>Условия скидки:</strong> <span>для постоянных клиентов Софтиум</span></p>
														<?php } ?>
													<?php endif; ?>
													
													<p class="buy-button"><a href="/method/#mc<?php echo get_the_ID(); ?>" class="btn btn-primary">Узнать больше</a></p>
													
												</div>
											</div>
										</div>
									</div>
									
								</div>
							</div>
						</div>				
						
					<?php 
					$i++; if ($i==13) $i=1;
					}
					wp_reset_postdata(); // сброс
					
					} else {
					?>
					
					<br/>
					<p>В настоящий момент мастер-классы не запланированы.</p>
					
					<?php } ?>
				</div>
				
			</div>
				
        </div>
    </div>
</section>
