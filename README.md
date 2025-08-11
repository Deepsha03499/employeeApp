# Frontend
•	Developed using Angular.
•	Single Page Application (SPA) architecture.
•	Communicates with backend API via HTTP client services (EmployeeService and DepartmentService).
•	Features:
o	Employee list view with pagination and search.
o	Form for adding and updating employee records with validation.
o	Dropdown list for department selection in add/update employee form.
o	Modal dialogs for add/edit forms and delete confirmation.
o	Responsive UI updates without page reloads.

# Setup and Prerequisites
Prerequisites:
•	Node.js (v20 or later) installed
•	Angular CLI (v19) installed globally: npm install -g @angular/cli@19
•	Install code editor Visual studio code.
Setup:
•	Open the project folder in Visual Studio Code.
•	Open the terminal in VS Code (shortcut: Ctrl + J).
•	In the terminal, ensure you are in the correct project folder. If yes, run: npm install, to install dependencies and node modules.
•	After installing node modules, check the API URL in the environment.ts file and make sure it matches the backend URL. (Path: project folder > src > app > environment > environment.ts).
•	To run the project, use the following command: ng serve -o
