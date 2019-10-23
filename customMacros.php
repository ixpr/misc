<?php
    
    	use UmiCms\Service;
	use UmiCms\System\Auth\AuthenticationException;
    
	/**
	 * Класс пользовательских макросов
	 */
	class UsersCustomMacros {
		/**
		 * @var users $module
		 */
		public $module;
        	
		public function generateRandomString($length = 10) {
			//$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			$characters = '0123456789';
			$charactersLength = strlen($characters);
			$randomString = '';
			for ($i = 0; $i < $length; $i++) {
				$randomString .= $characters[rand(0, $charactersLength - 1)];
			}
			return $randomString;
		}

		public function request_money_do($template = "default") {
			$module = $this->module;

			// отправить уведомление администратору
			$email_from = regedit::getInstance()->getVal("//settings/email_from");
			$fio_from = $fio = regedit::getInstance()->getVal("//settings/fio_from");
			
			$email = 'sadi-edema@mail.ru';
			
			$domain = cmsController::getInstance()->getCurrentDomain();

			$mail_subject = 'Запрос на вывод средств на сайте сады-эдема.рф';
			$mail_content = '
			<p>
			 Получен запрос на вывод средств с личного счёта.<br/><br/>
			 Пользователь: <b><a href="http://сады-эдема.рф/admin/users/edit/'.getRequest("user_id").'">http://сады-эдема.рф/admin/users/edit/'.getRequest("user_id").'</a></b><br/>
			 Сумма: <b>'.getRequest("user_money").' руб.</b><br/>
			 Фамилия: <b>'.getRequest("user_lname").'</b><br/>
			 Имя: <b>'.getRequest("user_fname").'</b><br/>
			 Отчество: <b>'.getRequest("user_father_name").'</b><br/>
			 Карта: <b>'.getRequest("user_card").'</b><br/>
			</p>';

			$someMail = new umiMail();
			$someMail->addRecipient($email, $fio);
			$someMail->setFrom($email_from, $fio_from);
			$someMail->setSubject($mail_subject);
			//$someMail->setPriorityLevel("highest");
			$someMail->setContent($mail_content);
			$someMail->commit();
			$someMail->send();
		
			$url = getRequest("from_page");
			if (!$url) {
				$url = ($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : $module->pre_lang . "/users/settings/";
			}

			$module->redirect($url.'?mail=sent');
		}

		public function send_claim_do($template = "default") {
			$module = $this->module;

			// отправить уведомление администратору
			$email_from = regedit::getInstance()->getVal("//settings/email_from");
			$fio_from = $fio = regedit::getInstance()->getVal("//settings/fio_from");
			
			$email = 'sadi-edema@mail.ru';
			
			$domain = cmsController::getInstance()->getCurrentDomain();

			$mail_subject = 'Претензия на сайте сады-эдема.рф';
			$mail_content = '
			<p>
			 Получена претензия.<br/><br/>
			 Пользователь: <b><a href="http://сады-эдема.рф/admin/users/edit/'.getRequest("user_id").'">http://сады-эдема.рф/admin/users/edit/'.getRequest("user_id").'</a></b><br/>
			 ФИО: <b>'.getRequest("claim_fio").'</b><br/>
			 Телефон: <b>'.getRequest("claim_phone").'</b><br/>
			 Город: <b>'.getRequest("claim_city").'</b><br/>
			 E-mail: <b>'.getRequest("claim_email").'</b><br/>
			</p>';
			$mail_content .= '
			<p>
			 Вид претензии: <b>'.getRequest("claim_type").'</b><br/>
			</p>';
			$mail_content .= '
			<p>
			 Суть претензии: <b>'.getRequest("claim_content").'</b><br/>
			</p>';
			if (getRequest("request_transfer")) $mail_content .= '
			<p>
			 <b>Прошу перенести сумму на последующие заказы (Зачислить на личный счет)</b><br/>
			</p>';
			if (getRequest("request_exchange")) $mail_content .= '
			<p>
			 <b>Прошу отправить замену со следующей посылкой</b><br/>
			</p>';
			if (getRequest("request_money")) $mail_content .= '
			<p>
			 <b>Прошу вернуть деньги</b><br/>
			</p>'; 
			
			// Растения
			if (getRequest("plants")) {
				$i=0;
				$mail_content .= '
				<p>
				 Список растений для претензии:<br/>
				</p>';	
				foreach (getRequest("plants") as $plants) {
					$i++;
					if ($plants['sku'] || $plants['name']) {
						$mail_content .= '<p>'.$i;
					} else {
						$mail_content .= '<p>--<br/></p>';
					}
					if ($plants['sku']) $mail_content .= ' | Артикул: <b>'.$plants['sku'].'</b>';
					if ($plants['name']) $mail_content .= ' | Наименование: <b>'.$plants['name'].'</b>';
					if ($plants['qty']) $mail_content .= ' | Количество: <b>'.$plants['qty'].'</b>';
					if ($plants['price']) $mail_content .= ' | Цена: <b>'.$plants['price'].' руб.</b>';
					if ($plants['sum']) $mail_content .= ' | Сумма: <b>'.$plants['sum'].' руб.</b>';
					if ($plants['sku'] || $plants['name']) $mail_content .= '<br/></p>';
				}
			}
			
			// Фото
			if (!empty($_FILES)) {
				$mail_content .= '
				<p>
				 Фото товаров:<br/>
				</p>';	
				
				$uploaded_image = umiImageFile::upload('photo', 'first', USER_IMAGES_PATH . '/cms/data');
				if ($uploaded_image) {
					$mail_content .= '<img src="'.$uploaded_image.'" alt="фото1" /><br/><br/>';
				}
				
				$uploaded_image_2 = umiImageFile::upload('photo', 'second', USER_IMAGES_PATH . '/cms/data');
				if ($uploaded_image_2) {
					$mail_content .= '<img src="'.$uploaded_image_2.'" alt="фото2" /><br/><br/>';
				}
				
				$uploaded_image_3 = umiImageFile::upload('photo', 'third', USER_IMAGES_PATH . '/cms/data');
				if ($uploaded_image_3) {
					$mail_content .= '<img src="'.$uploaded_image_3.'" alt="фото3" /><br/><br/>';
				}
				
				$uploaded_image_4 = umiImageFile::upload('photo', 'fourth', USER_IMAGES_PATH . '/cms/data');
				if ($uploaded_image_4) {
					$mail_content .= '<img src="'.$uploaded_image_4.'" alt="фото4" /><br/><br/>';
				}	
				
				$uploaded_image_5 = umiImageFile::upload('photo', 'fifth', USER_IMAGES_PATH . '/cms/data');
				if ($uploaded_image_5) {
					$mail_content .= '<img src="'.$uploaded_image_5.'" alt="фото5" /><br/><br/>';
				}	
				
				$uploaded_image_6 = umiImageFile::upload('photo', 'sixth', USER_IMAGES_PATH . '/cms/data');
				if ($uploaded_image_6) {
					$mail_content .= '<img src="'.$uploaded_image_6.'" alt="фото6" /><br/><br/>';
				}	
				
				$uploaded_image_7 = umiImageFile::upload('photo', 'seventh', USER_IMAGES_PATH . '/cms/data');
				if ($uploaded_image_7) {
					$mail_content .= '<img src="'.$uploaded_image_7.'" alt="фото7" /><br/><br/>';
				}
			}		

			$someMail = new umiMail();
			$someMail->addRecipient($email, $fio);
			$someMail->setFrom($email_from, $fio_from);
			$someMail->setSubject($mail_subject);
			//$someMail->setPriorityLevel("highest");
			$someMail->setContent($mail_content);
			$someMail->commit();
			$someMail->send();
		
			$url = getRequest("from_page");
			if (!$url) {
				$url = ($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : $module->pre_lang . "/users/settings/";
			}

			$module->redirect($url.'?mail=sent');
		}

		public function request_payorder_do($template = "default") {
			$module = $this->module;

			// отправить уведомление администратору
			$email_from = regedit::getInstance()->getVal("//settings/email_from");
			$fio_from = $fio = regedit::getInstance()->getVal("//settings/fio_from");
			
			$email = 'sadi-edema@mail.ru';
			
			$domain = cmsController::getInstance()->getCurrentDomain();

			$mail_subject = 'Запрос на оплату заказа на сайте сады-эдема.рф';
			$mail_content = '
			<p>
			 Получен запрос на оплату заказа с личного счёта.<br/><br/>
			 Пользователь: <b><a href="http://сады-эдема.рф/admin/users/edit/'.getRequest("user_id").'">http://сады-эдема.рф/admin/users/edit/'.getRequest("user_id").'</a></b><br/>
			 Сумма: <b>'.getRequest("pay_sum").' руб.</b><br/>
			 Номер заказа: <b>'.getRequest("order_number").'</b><br/>
			</p>';

			$someMail = new umiMail();
			$someMail->addRecipient($email, $fio);
			$someMail->setFrom($email_from, $fio_from);
			$someMail->setSubject($mail_subject);
			//$someMail->setPriorityLevel("highest");
			$someMail->setContent($mail_content);
			$someMail->commit();
			$someMail->send();
		
			$url = getRequest("from_page");
			if (!$url) {
				$url = ($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : $module->pre_lang . "/users/settings/";
			}

			$module->redirect($url.'?mail=sent');
		}

		public function request_bonus_pay($template = "default") {
			$module = $this->module;

			// отправить уведомление администратору
			$email_from = regedit::getInstance()->getVal("//settings/email_from");
			$fio_from = $fio = regedit::getInstance()->getVal("//settings/fio_from");
			
			$email = 'sadi-edema@mail.ru';
			
			$domain = cmsController::getInstance()->getCurrentDomain();							
			$objectsCollection = umiObjectsCollection::getInstance();
			
			if (getRequest("bonus_order")) {
				
				$orderId = getRequest("bonus_order");
				$order = $objectsCollection->getObject($orderId);
				$orderNumber = $order->getValue('number');			
				$bonusSum = getRequest("bonus_sum");
				$userId = getRequest("user_id");
				
				// check bonus sum
				$customer = $objectsCollection->getObject($userId);
				if ($bonusSum > $customer->getValue('bonus')) $bonusSum = $customer->getValue('bonus');
				
				// update customer bonuses
				$customer->setValue('bonus', $customer->getValue('bonus') - $bonusSum);
				$customer->setValue('spent_bonus', $customer->getValue('spent_bonus') + $bonusSum);
				
				// add bonuses to order
				$order->setValue('account_bonus', $order->getValue('account_bonus') + $bonusSum);
				
				// send mail
				$mail_subject = 'Запрос на оплату заказа бонусами на сайте сады-эдема.рф';
				$mail_content = '
				<p>
				 Получен запрос на оплату заказа бонусными баллами. Бонусные баллы списались у пользователя и были добавлены к сумме предоплаты по заказу '.$orderNumber.'.<br/><br/>
				 Пользователь: <b><a href="http://сады-эдема.рф/admin/users/edit/'.$userId.'">http://сады-эдема.рф/admin/users/edit/'.$userId.'</a></b><br/>
				 Сумма: <b>'.$bonusSum.' руб.</b><br/>
				 Номер заказа: <b>'.$orderNumber.'</b><br/>
				</p>';

				$someMail = new umiMail();
				$someMail->addRecipient($email, $fio);
				$someMail->setFrom($email_from, $fio_from);
				$someMail->setSubject($mail_subject);
				//$someMail->setPriorityLevel("highest");
				$someMail->setContent($mail_content);
				$someMail->commit();
				$someMail->send();
			
				$url = getRequest("from_page");
				if (!$url) {
					$url = ($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : $module->pre_lang . "/users/settings/";
				}

				$module->redirect($url.'?mail=sent');
			
			}
		}

		public function get_order_bonuses($template = "default") {
			$module = $this->module;

			$objects = umiObjectsCollection::getInstance();
			$emarket = cmsController::getInstance()->getModule("emarket");
			
			$order = $emarket->getBasketOrder();
			$discount = bonusDiscount::searchBonus($order);
			if (!$discount instanceof bonusDiscount) {
				return false;
			}

			$price = $order->getActualPrice();
			$bonus = ceil($price - $discount->recalcPrice($price));
			
			return $bonus;
		}

	}
?>
