<?php session_start();

require '../funciones.php';

$conexion = conexion('exvotos_laminas_mx', 'root', 'java0900');

if(!$conexion) {

    //redirigir la pagina de error
    //Por el momento estamos 

    die();
}


if (isset($_SESSION['usuario'])) {
    header('Location: inicioAdmin.php');
    die();
}



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $usuario = filter_var(strtolower($_POST['usuario']), FILTER_SANITIZE_STRING);
    $password = $_POST['password'];
    $password = hash('sha512',$password);

    

    $statement = $conexion->prepare('SELECT * FROM admin WHERE userName = :user AND userPass = :pass');
    $statement->execute(array(
        ':user' => $usuario,
        ':pass' => $password
    ));




    $resultado = $statement->fetch();


   if ($resultado !== false) {
       $_SESSION['usuario'] = $usuario;
       header('Location: index.php');
   } else {
       $errores .= '<li> ¡ Datos Incorrectos ! </li>';
   } 
}
require '../views/login.view.php';



?>