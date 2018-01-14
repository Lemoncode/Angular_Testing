Starts from previous demo.

## Steps

1. Now we are going to use NO_ERRORS_SCHEMA, what it does, is to skip errors on the declarations of TestBed.

...
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
....

beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                UserTasksComponent,
                // CollapsibleComponent,
                StatePipe
            ],
            providers: [],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    }));
