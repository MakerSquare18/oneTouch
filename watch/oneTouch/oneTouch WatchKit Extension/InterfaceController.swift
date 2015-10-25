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


class InterfaceController: WKInterfaceController{

    // Receipt Image Displayer --- May change this to text based receipts
    @IBOutlet var receiptImage: WKInterfaceImage!
    
    // View for displaying possible purchases
    @IBOutlet var purchasePicker: WKInterfacePicker!
    
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
    
    // Sends a psot request to server to purchase item
    func purchaseButtonTouch() {
        let url: String = "http://127.0.0.1:3000/api/purchase"
        let parameters = ["itemId": currentItem]
        Alamofire.request(.POST, url, parameters: parameters, encoding:.JSON)
            .responseJSON{response in
                self.receiptImage.setImageNamed("testReceipt.png")
                self.addTrashButton()
        }
    }
    
    // Gets rid of receipt image
    func trashReceiptTouch() {
        receiptImage.setImage(nil)
        addPurchaseButton()
    }
    
    
    override func awakeWithContext(context: AnyObject?) {
        super.awakeWithContext(context)
        
        // Initialize application with purchase button in context menu
        addPurchaseButton()
        
        // Initialize Loading screen until AJAX completes
        let loadingItem: WKPickerItem = WKPickerItem()
        loadingItem.title = "Loading..."
        let pickerLoading: [WKPickerItem] = [loadingItem]
        purchasePicker.setItems(pickerLoading)
        
        // Array of picker items that will be populated when AJAX completes
        var purchasableItems: [WKPickerItem] = []
        
        // AJAX call that loads purchasable items
        let url: String = "http://127.0.0.1:3000/api/user/makersquare18"
        Alamofire.request(.GET, url, parameters: nil)
            .responseJSON{response in
                var data: JSON = JSON(response.result.value!)
                // TODO: Make this programmatic
                for i in 0...3 {
                    let item = WKPickerItem()
                    item.title = data["preferences", i, "itemInfo", "name"].string
                    purchasableItems.append(item)
                }
                self.purchasePicker.setItems(purchasableItems)
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
