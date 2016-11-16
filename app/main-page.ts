import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { ObservableArray } from "data/observable-array"
import { isIOS } from "platform";
import {ListView} from "ui/list-view";
import {MyDataSource} from "./myds"

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  var array = new ObservableArray();
  for(var i=0; i<100; i++){
    array.push({title:"sample title "+i});
  }
  if(isIOS){
    var listview:ListView =<ListView> page.getViewById("listviewLoaded");
    listview.ios.dataSource = MyDataSource.initWithOwner(new WeakRef(listview));
  }
  page.bindingContext = {source:array};
}