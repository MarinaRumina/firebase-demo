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
  dbCoursesList$: AngularFireList<{}>;
  courses$: Observable<{}>;
  // course$: Observable<{}>;
  author$: Observable<{}>;
  // db: AngularFireDatabase;

  constructor(private db: AngularFireDatabase) {
    this.dbCoursesList$ = db.list('/courses');
    this.courses$ = this.dbCoursesList$.valueChanges();
    // this.course$ = db.object('/courses/1').valueChanges();
    this.author$ = db.object('/authors/1').valueChanges();
  }

  add(course: HTMLInputElement) {
    this.dbCoursesList$.push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        { title: 'Components' },
        { title: 'Directives' },
        { title: 'Template' }
      ]
    });
    course.value = '';
  }

  update(course) {
    this.db.object('/courses/' + course)
      .set({
        title: course + ' UPDATED',
        price: 150
      });
  }

  delete(course) {
    this.db.object('/courses/' + course)
      .remove()
      .then(x => console.log('Deleted'))
      .catch(err => console.log('Error'));
  }
}
