const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const idDelete = req.params.id;
  
  console.log('ID to delete:', idDelete);
  console.log('Before deletion:', employee);

  employee.forEach(emp => console.log(typeof emp.id, emp.id));
  const index= employee.findIndex(emo => emo.id === idDelete);
  console.log('Before deletion:', index);
  if(index != -1){
    employee.splice(index, 1);
    console.log('After deletion:', employee);
    res.status(200).json({message: 'Employee deleted'});
  }
  else {
    console.log('Employee not found for deletion');
    res.status(404).json({message: 'could not delete the employee'}); 
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;

  const alreadythere = employee.find(emp => emp.id === id);

  if(alreadythere){
    res.status(400).json({message: ' there exist emp with this id. try another one'});
  }
  else{
    employee.push({id , name});
    res.status(201).json({message: 'Employee added successfully'});
  }
};
