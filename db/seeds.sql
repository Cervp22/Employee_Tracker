
INSERT INTO departments (department_name)
VALUES 
('Accounting'),
('Marketing'),
('Sales'),
('Legal'),
('Customer Service'),
('Information Technology'),
('Human Resources');


INSERT INTO roles (title, salary, department)
VALUES 
('Accounting Mgr',50000, 1),
('Accounting Assist', 60000, 1),
('Marketing Dir',65000, 2),
('Sales Mgr', 50000, 3),
('Sales Associate',45000, 3),
('Legal Dir',120000, 4),
('Customer Serv',45000, 5),
('Information Tech',100000, 6),
('Human Resources',65000, 7);

INSERT INTO employees(first_name,last_name,role_id)
VALUES 
('Ardany','Oliva',1),
('Diana','Maldonado',1),
('Andy', 'Rodriguez',2),
('Steve','Rodriguez',3),
('Kevin', 'Rodriguez',3),
('Eddie', 'Oliva',4),
('John', 'Smith',5),
('Brandon','Perez',6),
('Luis','Nava',7)

