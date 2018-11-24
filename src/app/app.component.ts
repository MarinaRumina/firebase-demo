import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // $ at the end of var means it is observable
  coursesList$: AngularFireList<{}>;
  courses$: Observable<{}>;
  // course$: Observable<{}>;
  author$: Observable<{}>;
  // db: AngularFireDatabase;

  constructor(db: AngularFireDatabase) {
    this.coursesList$ = db.list('/courses');
    this.courses$ = this.coursesList$.valueChanges();
    // this.course$ = db.object('/courses/1').valueChanges();
    this.author$ = db.object('/authors/1').valueChanges();
  }

  add(course: HTMLInputElement) {
    this.coursesList$.push(course.value);
    course.value = '';
  }
}
