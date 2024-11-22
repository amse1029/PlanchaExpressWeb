-- Tabla Administrador
CREATE TABLE Administrador (
	id_administrador INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50),
    usuario VARCHAR(50),
    pass VARCHAR(50)
);

-- Tabla Cliente
CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    email VARCHAR(50),
    pass VARCHAR(15)
);

-- Tabla Queja
CREATE TABLE Queja (
    id_queja INT AUTO_INCREMENT PRIMARY KEY,
    mensaje TEXT,
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

-- Tabla Servicio
CREATE TABLE Servicio (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100),
    precio FLOAT,
    cantidad INT
);

-- Tabla NotaRemision
CREATE TABLE NotaRemision (
    id_nota INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha_entrega DATE,
    total FLOAT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

-- Relación muchos a muchos entre NotaRemision y Servicio
CREATE TABLE NotaServicio (
    id_nota_servicio INT AUTO_INCREMENT PRIMARY KEY,
    id_nota INT,
    id_servicio INT,
    FOREIGN KEY (id_nota) REFERENCES NotaRemision(id_nota),
    FOREIGN KEY (id_servicio) REFERENCES Servicio(id_servicio)
);

-- Tabla Reporte
CREATE TABLE Reporte (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE
);

-- Tabla ReporteVenta (extiende Reporte)
CREATE TABLE ReporteVenta (
    id_reporte INT,
    ventaTotal FLOAT,
    FOREIGN KEY (id_reporte) REFERENCES Reporte(id_reporte)
);

-- Tabla ReporteServicios (extiende Reporte)
CREATE TABLE ReporteServicios (
    id_reporte INT,
    id_servicio INT,
    FOREIGN KEY (id_reporte) REFERENCES Reporte(id_reporte),
    FOREIGN KEY (id_servicio) REFERENCES Servicio(id_servicio)
);
