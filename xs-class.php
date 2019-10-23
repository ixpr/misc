<?php

class axiomus_xs extends def_module {

    public $defaultWeight;
    public $defaultWidth;
    public $defaultHeight;
    public $defaultLength;

    public function __construct()
    {
        parent::__construct();

        if (cmsController::getInstance()->getCurrentMode() == "admin") {
            $this->__loadLib("__admin.php");
            $this->__implement("__axiomus_xs_adm");
        }

        $this->defaultWeight = 0.1;

        $this->__loadLib("__custom.php");
        $this->__implement("__axiomus_xs_custom");

        $this->__loadLib("__regions.php");
        $this->__implement("__axiomus_xs_regions");

        $this->__loadLib("__capitals.php");
        $this->__implement("__axiomus_xs_capitals");

        $this->__loadLib("__boxberry.php");
        $this->__implement("__axiomus_xs_boxberry");

        $this->__loadLib("__dpd.php");
        $this->__implement("__axiomus_xs_dpd");

        $this->__loadLib("__post.php");
        $this->__implement("__axiomus_xs_post");
	}

    public function canOrder() {
        return true;
    }

    static $apiCache = array();

    /**
     * @param string $postfix
     * @return AxiomusApi
     * @throws publicException
     */
    public function getApi($postfix = '') {
        $class = 'AxiomusApi'. $postfix;

        if(!class_exists($class)) {
            throw new publicException('Class - '. $class. ' does not exist');
        }

        $regedit = regedit::getInstance();

        $params = array();

        if($regedit->getVal('//modules/axiomus_xs/test')) {
            $params['server'] = 'http://axiomus.ru/test/api_xml_test.php';
            $params['uId'] = '92';
            $params['uKey'] = 'XXcd208495d565ef66e7dff9f98764XX';
        } else {
            $params['server'] = 'http://axiomus.ru/hydra/api_xml.php';
            $params['uId'] = $regedit->getVal('//modules/axiomus_xs/uId');
            $params['uKey'] = $regedit->getVal('//modules/axiomus_xs/uKey');
        }

        if(!isset(self::$apiCache[$class])) {
            self::$apiCache[$class] = new $class($params['server'], $params['uKey'], $params['uId']);
        }

        return self::$apiCache[$class];
    }

    public function prepareItems(order $order) {
        $items = array();

        foreach($order->getItems() as $orderItem) {
            if(!$orderItem instanceof orderItem)
                continue;

            $item = AxiomusOrderItem::getFromOrderItem($orderItem);

            $items[] = $item;
        }

        $itemWeight = $this->defaultWeight / count($items);

        foreach($items as $item) {
            $item->setWeight($itemWeight);
        }

        return $items;
    }

    public function getOrderCustomerName(order $order, $pattern = '%lname% %fname% %father_name%') {
        $customer = umiObjectsCollection::getInstance()->getObject($order->getCustomerId());

        if(!$customer)
            return false;

        $values = array(
            '%lname%' => $customer->getValue('lname'),
            '%fname%' => $customer->getValue('fname'),
            '%father_name%' => $customer->getValue('father_name')
        );

        return trim(str_replace(array_keys($values), array_values($values), $pattern));
    }

    public function getOrderCustomerContacts(order $order) {
        $customer = umiObjectsCollection::getInstance()->getObject($order->getCustomerId());

        if(!$customer)
            return false;

        $phone = str_replace(array('+', '-', '(', ')', ' '), '', $customer->getValue('phone'));

        if($phone[0] === '8')
            $phone[0] = '7';

        return substr($phone, 0, 11);
    }

    public function getOrderCustomerEmail(order $order) {
        $customer = umiObjectsCollection::getInstance()->getObject($order->getCustomerId());

        if(!$customer)
            return false;

        $email = $customer->getValue('email');

        return $email;
    }

    public function getOrderDDate(order $order) {
        $day = date('w');

        $days = 1;

        /*ѕо умолчанию - два дн¤. ≈сли доставка выпадает на выходные, то следующий рабочий день*/

		if($day == 6) {
            $days = $days + 1;
        }
		
        return mktime(12, 0, 0, date('n'), date('j') + $days);
    }

    public function getOrderDDateSpb(order $order) {
        $day = date('w');

        $days = 2;

        /*ѕо умолчанию - два дн¤. ≈сли доставка выпадает на выходные, то следующий рабочий день*/

		if($day == 6) {
            $days = $days + 1;
        }
		
        return mktime(12, 0, 0, date('n'), date('j') + $days);
    }

    public function getOrderEDateMsk(order $order) {
        $day = date('w');

        $days = 3;

        /*ѕо умолчанию - два дн¤. ≈сли доставка выпадает на выходные, то следующий рабочий день*/

		if($day == 6) {
            $days = $days + 1;
        }
		
        return mktime(12, 0, 0, date('n'), date('j') + $days);
    }
	
    public function getOrderBDateSPb(order $order) {
        $day = date('w');

        $days = 2;

        /*ѕо умолчанию - два дн¤. ≈сли доставка выпадает на выходные, то следующий рабочий день*/

		if($day == 6) {
            $days = $days + 1;
        }
		
        return mktime(12, 0, 0, date('n'), date('j') + $days);
    }
	
    public function getOrderEDateSPb(order $order) {
        $day = date('w');

        $days = 4;

        /*ѕо умолчанию - два дн¤. ≈сли доставка выпадает на выходные, то следующий рабочий день*/

		if($day == 6) {
            $days = $days + 1;
        }
		
        return mktime(12, 0, 0, date('n'), date('j') + $days);
    }
	
    public function getOrderAddress(order $order) {
        $addressId = $order->getValue('delivery_address');

        return ($addressId) ? umiObjectsCollection::getInstance()->getObject($addressId) : false;
    }

    public function getOrderCity(order $order) {
        $address = $this->getOrderAddress($order);

        return ($address) ? $address->getValue('city') : false;
    }

    public function installDelivery($typeId, $guid = false) {
        if(!$guid)
            $guid = $typeId;

        l_mysql_query("UPDATE `cms3_object_types` SET `guid` = 'emarket-delivery-{$guid}' WHERE `cms3_object_types`.`id` = {$typeId};");
    }

    public function createAxiomusOrder(order $order, $bCommit = false) {
		
	$deliveryType = getRequest('deliveryType');

        switch($deliveryType) {
            case 'axiomusCapitalsCourierDelivery':
                $method = 'newCapitalsCourier';
                break;
            case 'axiomusCapitalsPickupDelivery':
                $method = 'newCapitalsPickup';
                break;
            case 'axiomusDPDCourierDelivery':
                $method = 'newDPDCourier';
                break;
            case 'axiomusPostCourierDelivery':
                $method = 'newPostCourier';
                break;
            default:
                $method = false;
                break;
        }

        if($method) {
            $axiomusOrder = $this->$method($order);

            if($axiomusOrder && $axiomusOrder->getCode() == '0') {
                $order->setValue('axiomus_order_id', $axiomusOrder->getObjectId());
            }
        }

        if($bCommit) {
            $order->commit();
        }
    }

    public function testCreateAxiomusOrder($orderId = false) {
        if(!$orderId)
            return '';

        cmsController::getInstance()->getModule('emarket');

        $order = order::get($orderId);

        $this->createAxiomusOrder($order);
    }


}; ?>
