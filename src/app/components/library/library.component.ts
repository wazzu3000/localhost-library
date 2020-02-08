import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryFormComponent } from './form/library-form.component';
import { SessionService } from './../../services/session.service';
import { DatabaseService } from './../../services/database.service';

const emptyField = '----';

@Component({
    selector: 'library',
    templateUrl: './library.component.html',
    styleUrls: ['library.component.scss']
})
export class LibraryComponent implements OnInit {
    public books: any[] = [];
    public search: string;
    public emptyField = emptyField;

    public constructor(private router: Router, private modal: NgbModal, public session: SessionService, private db: DatabaseService) { }

    public ngOnInit() {
        setTimeout(() => this.updateBooks(), 100);
    }
    
    public bookForm(bookId: string = null) {
        let ref = this.modal.open(LibraryFormComponent, { scrollable: true });
        ref.componentInstance.bookId = bookId;
        ref.result.then(() => this.updateBooks());
    }

    public logout() {
        this.session.destroy();
        this.router.navigateByUrl('/login');
    }

    public async deleteBook(evt: Event, bookId: string) {
        evt.stopPropagation();
        await this.db.delete(bookId);
        await this.updateBooks();
    }

    private async updateBooks() {
        this.books = await this.db.getAll();
    }
}