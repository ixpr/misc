<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://i18n/constants.dtd:file">

<xsl:stylesheet	version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:param name="mail" /> 
	
	 <xsl:template match="property"  mode="extra_goods_lk"> 
		<xsl:param name="var1" tunnel="yes"/>
		<img src="{document(concat('udata://system/makeThumbnailFull/(', substring(value,2), ')/313/294/'))/udata/src}" class="catalog__item__block1__img1 location__img" alt="{$var1}" />
    </xsl:template>
	
	<xsl:template match="/result[@method = 'uclaim']">
	
		<section class="bread">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<a href="">
							<span class="awesome bread__span1"></span>
						</a> / 
						<a>
							<span class="bread__span3"> Личный кабинет</span>
						</a>
					</div>
				</div>
			</div>
		</section>	
	
		<section class="lk">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<p class="basketpage_p1">Личный кабинет</p>
						<h1 class="product-page__h1"></h1>
					</div>
				</div>
				<div class="row lk__wrap">
					<div class="col-md-3 lk-data">
						<div class="lk-data__wrap">
							<a href="/emarket/personal/" class="lk-data__row">
								<div class="lk-data-icon">
									<i class="fas fa-user-circle"></i>
								</div>
								Персональные данные
							</a>
							<a href="/emarket/uorders/" class="lk-data__row">
								<div class="lk-data-icon">
									<i class="fas fa-shopping-cart"></i>
								</div>
								Мои заказы
							</a>
							<a href="/emarket/ubonuses/" class="lk-data__row">
								<div class="lk-data-icon">
									<i class="fas fa-gift"></i>
								</div>
								Бонусные баллы
							</a>
							<a href="/emarket/uaccount/" class="lk-data__row">
								<div class="lk-data-icon">
									<i class="fas fa-ruble-sign"></i>
								</div>
								Личный счет
							</a>
							<a href="/emarket/upayorder/" class="lk-data__row">
								<div class="lk-data-icon">
									<i class="fas fa-credit-card"></i>
								</div>
								Оплатить заказ онлайн
							</a>
							<a href="/emarket/uprepay/" class="lk-data__row">
								<div class="lk-data-icon">
									<i class="fas fa-credit-card"></i>
								</div>
								Реквизиты для предоплаты
							</a>
							<a href="/emarket/ufavorites/" class="lk-data__row">
								<div class="lk-data-icon">
									<i class="fas fa-heart"></i>
								</div>
								Избранное
							</a>
							<a href="/emarket/uviewed/" class="lk-data__row">
								<div class="lk-data-icon">
									<i class="fas fa-eye"></i>
								</div>
								Недавно просмотренное
							</a>
							<a href="/emarket/uclaim/" class="lk-data__row lk-data__active">
								<div class="lk-data-icon">
									<i class="fas fa-exclamation-circle"></i>
								</div>
								Оформить претензию
							</a>
						</div>
					</div>
					<div class="col-md-9">
						<div class="lk-content">
							<div class="lk-content__row">
								<div class="row">
									<div class="col-md-8">
										<p class="order-data__h">Оформить претензию</p>
									</div>
								</div>
								
								<!--<xsl:if test="$mail = 'sent'">
									<div class="simple_notification">
										Ваша претензия отправлена. Наш менеджер свяжется с вами в ближайшее время!
									</div>
								</xsl:if>-->

								<div class="row">
									<form method="post" action="{$lang-prefix}/users/send_claim_do/" enctype="multipart/form-data">
										<input type="hidden" name="user_id" value="{document('udata://custom/getUserId')/udata}" />
										<input type="hidden" name="from_page" value="/emarket/uclaim/" />
										<div class="col-md-12">
											<p class="f-16">Претензии принимаются в течение 3-х дней после получения заказа. Если посылка пролежала в месте получения дольше 3-х дней с момента поступления в пункт выдачи – претензии по качеству материала не принимаются.</p><p class="f-16">Более подробно о правилах приема претензий <a href="#" class="link-type-3">читайте здесь<i class="fas fa-chevron-right"></i></a></p>
										</div>
										<div class="col-md-8">
											<div class="lk-form">
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Контактные данные:</p>
													<div class="order-data__form order-data__form-reg">
														<div class="order-data__form-reg-flex">
															<div class="order-data__container">
																<i class="fas fa-user-circle"></i>
																<input type="text" name="claim_fio" class="feedback_input order-data-input" required="required" placeholder="Ваши Фамилия Имя Отчество" />
															</div>
															<div class="order-data__container">
																<i class="fas fa-map-marker"></i>
																<input type="text" name="claim_city" class="feedback_input order-data-input" placeholder="Город" />
															</div>
															<div class="order-data__container">
																<i class="fas fa-phone"></i>
																<input type="text" name="claim_phone" class="feedback_input order-data-input" required="required" placeholder="Ваш телефон" />
															</div>
															<div class="order-data__container">
																<i class="fas fa-envelope"></i>
																<input type="text" name="claim_email" class="feedback_input order-data-input" placeholder="Ваш Email" />
															</div>
														</div>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Вид претензии:</p>
													<div class="way-main-content__form">
														<div class="d-container">
															<select name="claim_type" class="order-data-input feedback_input order-data-input-p0 w100 way-main-content__select">
																<option value="По качеству растений">По качеству растений</option>
																<option value="По недопоставке">По недопоставке</option>
																<option value="По сортности">По сортности</option>
																<option value="Другое">Другое</option>
															</select> 
														</div>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Суть претензии:</p>
													<div class="way-main-content__form order-data__form">
														<div class="d-container textarea-w-mob">
															<i class="fas fa-user-circle"></i>
															<textarea name="claim_content" id="textarea_claim" cols="30" rows="8" class="order-data-input feedback_input w100 textarea" required="required" placeholder="Ваша претензия"></textarea>
														</div>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Список растений для претензии:</p>
													<div class="order-data__form order-data__form-reg form-plants">
														<div class="order-data__form-reg-flex">
															<div class="order-data__container">
																<input name="plants[0][sku]" type="text" class="order-data-input feedback_input order-data-input-p0" placeholder="Артикул" />
															</div>
															<div class="order-data__container">
																<input name="plants[0][name]" type="text" class="order-data-input feedback_input order-data-input-p0" placeholder="Наименование" />
															</div>
															<div class="order-data__container">
																<input name="plants[0][qty]" type="text" class="order-data-input feedback_input order-data-input-p0 lk-w170" placeholder="Количество" />
															</div>
															<div class="order-data__container">
																<input name="plants[0][price]" type="text" class="order-data-input feedback_input order-data-input-p0 lk-w170" placeholder="Цена" />
															</div>
															<div class="order-data__container">
																<input name="plants[0][sum]" type="text" class="order-data-input feedback_input order-data-input-p0 lk-order-data-input-mr lk-w170" placeholder="Сумма" />
															</div>
														</div>
													</div>
													<div class="lk-form-wrap__add-pl">
														<span href="#" class="link-type-4">
															<i class="fas fa-plus"></i>
															<span>Добавить еще растение</span>
														</span>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Фото товара №1:</p>
													<div class="lk-form-data">
														<div class="file_upload">
															<button type="button">Выбрать файлы</button>
															<div class="lk-form-wrap-text">Файл не выбран</div>
															<input type="file" name="photo[first]" />
														</div>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Фото товара №2:</p>
													<div class="lk-form-data">
														<div class="file_upload">
															<button type="button">Выбрать файлы</button>
															<div class="lk-form-wrap-text">Файл не выбран</div>
															<input type="file" name="photo[second]" />
														</div>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Фото товара №3:</p>
													<div class="lk-form-data">
														<div class="file_upload">
															<button type="button">Выбрать файлы</button>
															<div class="lk-form-wrap-text">Файл не выбран</div>
															<input type="file" name="photo[third]" />
														</div>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Фото товара №4:</p>
													<div class="lk-form-data">
														<div class="file_upload">
															<button type="button">Выбрать файлы</button>
															<div class="lk-form-wrap-text">Файл не выбран</div>
															<input type="file" name="photo[fourth]" />
														</div>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Фото товара №5:</p>
													<div class="lk-form-data">
														<div class="file_upload">
															<button type="button">Выбрать файлы</button>
															<div class="lk-form-wrap-text">Файл не выбран</div>
															<input type="file" name="photo[fifth]" />
														</div>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Фото товара №6:</p>
													<div class="lk-form-data">
														<div class="file_upload">
															<button type="button">Выбрать файлы</button>
															<div class="lk-form-wrap-text">Файл не выбран</div>
															<input type="file" name="photo[sixth]" />
														</div>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Фото товара №7:</p>
													<div class="lk-form-data">
														<div class="file_upload">
															<button type="button">Выбрать файлы</button>
															<div class="lk-form-wrap-text">Файл не выбран</div>
															<input type="file" name="photo[seventh]" />
														</div>
													</div>
												</div>
												<div class="lk-form-wrap">
													<p class="lk-form-wrap__h">Требование:</p>
													<div class="order-data__form-link">
														<label>
															<input class="checkbox" type="checkbox" name="request_transfer" />
															<span class="checkbox-custom"></span>
															<span class="label">Прошу перенести сумму на последующие заказы 
															<br/>(Зачислить на личный счет)</span>
														</label>
														<input class="checkbox" id="check1" type="checkbox" name="check" value="check1" />
														<label for="check1" class="checkbox_d"></label>
													</div>
													<div class="order-data__form-link">
														<label>
															<input class="checkbox" type="checkbox" name="request_exchange" />
															<span class="checkbox-custom"></span>
															<span class="label">Прошу отправить замену со следующей посылкой</span>
														</label>
														<input class="checkbox" id="check1" type="checkbox" name="check" value="check1" />
														<label for="check1" class="checkbox_d"></label>
													</div>
													<div class="order-data__form-link">
														<label>
															<input class="checkbox" type="checkbox" name="request_money" />
															<span class="checkbox-custom"></span>
															<span class="label">Прошу вернуть деньги</span>
														</label>
														<input class="checkbox" id="check1" type="checkbox" name="check" value="check1" />
														<label for="check1" class="checkbox_d"></label>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-12">
											<ul class="ul-type-2 lk-confidential">
												<li>
													<label>
														<input class="checkbox" type="checkbox" name="checkbox-test" checked="true" required="required" />
														<span class="checkbox-custom"></span>
														<span class="label">Я согласен на обработку моих персональных данных и ознакомлен с <a href="#" class="link-type-1 ul-type-2 link-type-f13">Политикой конфиденциальности</a></span>
													</label>
												</li>
												<li>
													<label>
														<input class="checkbox" type="checkbox" name="checkbox-test" checked="true" required="required" />
														<span class="checkbox-custom"></span>
														<span class="label">Я ознакомлен и согласен с <a href="#" class="link-type-1 link-type-f13">Правилами заказа</a> на сайте</span>
													</label>
												</li>
											</ul>
											<button class="mail-social__form__button hover_transit_gradient order-data__btn " value="" type="submit">Отправить заявку</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		
	</xsl:template>		
	
</xsl:stylesheet>
