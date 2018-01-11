/**
 * @param userType <string>
 * @param transactionStatus <string>
 * @param offerStatuses <ARRAY>
 * @param shipmentStatus <string>
 * @param invoiceStatys <string>
 * @param paymentStatus <string>
 */
function getStatus(userType, transactionStatus, offerStatuses, shipmentStatus, invoiceStatys, paymentStatus) {

    offerStatusMap : {
        //
    }

    var possibleOoutputs = {
        WaitingForPaymentSeller : {
            actionString : "WaitingForPayment",
            statusString : "Waiting for buyer payment",
            waitingForTime:  "8 Seconds later, a payment will be made"
        },
        WaitingForPaymentBuyer : {
            actionString : "WaitingForShipment",
            statusString : "Waiting for buyer payment",
            waitingForTime:  "8 Seconds later, a payment will be made"
        }
    };

    var map = {
        'seller|transaction|offer|shipment|invoice|payment' : 'WaitingForPaymentBuyer',
        'buyer|transaction|offer|shipment|invoice|payment' : 'WaitingForPaymentSeller',
        'buyer|transaction|offer|*' : 'WaitingForPaymentSeller',
        'buyer|transaction|offer|NULL|NULL|NULL' : 'WaitingForPaymentSeller',
    };

    return _getFromMap(userType, transactionStatus, offerStatuses, shipmentStatus, invoiceStatys, paymentStatus);

    function _getFromMap(userType, transactionStatus, offerStatuses, shipmentStatus, invoiceStatys, paymentStatus) {
        return possibleOutputs[concat(userType, transactionStatus, offerStatuses, shipmentStatus, invoiceStatys, paymentStatus)]
    }

}


//var map = {
//    userType: 'dealer,',
//    docTypes: {
//        transaction: false,
//        offer: false
//    },
//    status: {
//        actionString : "WaitingForPayment",
//        statusString : "Waiting for buyer payment",
//        waitingForTime:  "8 Seconds later, a payment will be made"
//    }
//
//    'user|transaction|offer|shipment|invoice|payment' : {
//        actionString : "WaitingForPayment",
//        statusString : "Waiting for buyer payment",
//        waitingForTime:  "8 Seconds later, a payment will be made"
//    }
//}
