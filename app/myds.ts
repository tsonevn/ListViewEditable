import {ListView} from "ui/list-view";

export class MyDataSource extends NSObject implements UITableViewDataSource {
    public static ObjCProtocols = [UITableViewDataSource];
    private owner: WeakRef<ListView>;
    private oldDataSource;
    public static initWithOwner(owner: WeakRef<ListView>): MyDataSource {
        let dataSource = new MyDataSource();
        dataSource.owner = owner;
        dataSource.oldDataSource = owner.get().ios.dataSource;
        return dataSource;
    }
    public tableViewNumberOfRowsInSection(tableView, section: number) {
        return this.oldDataSource.tableViewNumberOfRowsInSection(tableView, section);
    }
   public tableViewCellForRowAtIndexPath(tableView, indexPath) {
        return this.oldDataSource.tableViewCellForRowAtIndexPath(tableView, indexPath);
    }
    public tableViewCommitEditingStyleForRowAtIndexPath(tableView, editingStyle, indexPath) {
        if (typeof (this.oldDataSource.tableViewCommitEditingStyleForRowAtIndexPath) != 'undefined') {
            return this.oldDataSource.tableViewCommitEditingStyleForRowAtIndexPath(tableView, editingStyle, indexPath);
        }
        if(editingStyle == UITableViewCellEditingStyle.Delete) {
            var owner = this.owner.get();
            if (owner) {
                owner.items.splice(indexPath.row, 1);
                tableView.deleteRowsAtIndexPathsWithRowAnimation([indexPath], UITableViewRowAnimation.Fade);
            }
        }
    };
}