<?php 
function getEmployee() {
  $db = sapiendesignsConnect();
  $sql = 
    'SELECT employee_fname, employee_lname
    FROM employees
    WHERE employee_fname = "Erik"';
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $names = $stmt->fetchAll();
    $stmt->closeCursor();
    return $names;
}

echo "HELLOW WORLD"
?>

<!-- <script>
  console.log("HELLOW")
</script> -->