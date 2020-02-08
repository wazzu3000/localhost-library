import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from './../../../services/database.service';
import { SessionService } from './../../../services/session.service';
import * as uuid from 'uuid';

@Component({
    selector: 'library-form',
    templateUrl: './library-form.component.html'
})
export class LibraryFormComponent implements OnInit {
    public book: any = {};
    public formDirty: boolean;

    @ViewChild('bookForm', { static: true })
    public bookForm: NgForm;

    @Input()
    public bookId: string;

    public constructor(public activeModal: NgbActiveModal, private db: DatabaseService, private user: SessionService) { }

    public async ngOnInit() {
        if (this.bookId) {
            this.book = await this.db.get(this.bookId);
        } else {
            this.book.addedBy = this.user.userName;
        }
    }

    public async save() {
        this.formDirty = true;
        if (this.bookForm.invalid) {
            return;
        }

        this.book.id = this.bookId || uuid.v4();
        await this.db.save(this.book, this.bookId);
        this.activeModal.close();
    }
}