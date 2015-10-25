//
//  InterfaceController.swift
//  oneTouch WatchKit Extension
//
//  Created by Richard Artoul on 10/24/15.
//  Copyright © 2015 MakerSquare18. All rights reserved.
//

import WatchKit
import Foundation
import Alamofire
import SwiftyJSON

class InterfaceController: WKInterfaceController {
    // Store loaded preferences data here
    var userData: JSON = nil
    
    // Array of picker items that will be populated when AJAX completes
    var purchasableItems: [WKPickerItem] = []
    
    // Boolean indicating if purchase is in progress
//    var purchasing: Bool = false
    
    // Hard coded since there is no iOS app to go along with the watch
    let username: String = "makersquare18"

    // Receipt Image Displayer --- May change this to text based receipts
    @IBOutlet var receiptImage: WKInterfaceImage!
    
    // View for displaying possible purchases
    @IBOutlet var purchasePicker: WKInterfacePicker!
    
    // Using a slider for an animated loading bar
//    @IBOutlet var loadingBar: WKInterfaceSlider!
    
//    func showLoadingBar() {
//        loadingBar.setHidden(false)
//        var loadingCounter: Float = 0
//        loadingBar.setValue(loadingCounter)
//        while purchasing {
//            sleep(1)
//            loadingCounter++
//            loadingBar.setValue(loadingCounter)
//        }
//    }
    
//    func hideLoadingBar() {
//        purchasing = false
//        loadingBar.setHidden(true)
//    }
    
    // Represents currently selected item in picker
    var currentItem = 0
    
    // Callback to update current item whenever selected item in picker changes
    @IBAction func pickerItemChanged(newItem: Int) {
        currentItem = newItem;
    }
    
    // Sets the context menu to a purchase button
    func addPurchaseButton() {
        clearAllMenuItems()
        addMenuItemWithItemIcon(.Accept, title: "Purchase", action: "purchaseButtonTouch")
    }
    
    // Sets the context menu to a trash receipt button
    func addTrashButton() {
        clearAllMenuItems()
        addMenuItemWithItemIcon(.Trash, title: "Trash Receipt", action: "trashReceiptTouch")
    }
    
    // Sends a post request to server to purchase item
    func purchaseButtonTouch() {
        let url: String = "http://127.0.0.1:3000/api/payment"
        let merchantId: String = userData["preferences", currentItem, "merchantId"].string!
        print(userData["preferences", currentItem, "itemId"])
        let itemId: String = String(userData["preferences", currentItem, "_g_itemId"].int!)
        print(merchantId)
        print(itemId)
        let parameters = ["username": username, "merchantId": merchantId, "itemId": itemId]
        displayLoading()
        Alamofire.request(.POST, url, parameters: parameters, encoding:.JSON).response()
            {
                (_, _, data, _) in
                self.purchasePicker.setItems(nil)
                let image = UIImage(data: data! as! NSData)
                self.receiptImage.setImage(image)
                self.addTrashButton()
        }
    }
    
    // Gets rid of receipt image
    func trashReceiptTouch() {
        purchasePicker.setItems(nil)
        setPurchasableItems()
        receiptImage.setImage(nil)
        addPurchaseButton()
    }
    
    func setPurchasableItems() {
//        hideLoadingBar()
        let preferences = self.userData["preferences"]
        var counter: Int = 0;
        var localPurchasableItems: [WKPickerItem] = []
        for _ in preferences {
            let item = WKPickerItem()
            item.title = self.userData["preferences", counter, "name"].string
            localPurchasableItems.append(item)
            counter++
        }
        self.purchasePicker.setItems(localPurchasableItems)
    }
    
    func displayLoading() {
//        purchasing = true
//        showLoadingBar()
        // Initialize Loading screen until AJAX completes
        let loadingItem: WKPickerItem = WKPickerItem()
        loadingItem.title = "Loading..."
        let pickerLoading: [WKPickerItem] = [loadingItem]
        purchasePicker.setItems(pickerLoading)
    }
    
    override func awakeWithContext(context: AnyObject?) {
        super.awakeWithContext(context)
        
        displayLoading();
        
        // Initialize application with purchase button in context menu
        addPurchaseButton()
        
        // AJAX call that loads purchasable items
        let url: String = "http://127.0.0.1:3000/api/user/makersquare18"
        Alamofire.request(.GET, url, parameters: nil)
            .responseJSON {response in
                self.userData = JSON(response.result.value!)
                print(self.userData)
                self.setPurchasableItems()
        }
        
        
        
    }

    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
    }

    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
        super.didDeactivate()
    }

}
