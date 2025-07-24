import React from "react";

const Select = props => {

  const { type, name, options, classes, ...rest } = props;

  const optionElements = options.map(option => (
    <option key={option.id} value={option.value} >
      {option.label}
    </option>
  ));

  return (
    <>
      <select className={classes.root} id={name} type={type} name={name} {...rest}>
        {optionElements}
      </select>
    </>
  );
  
};

export default Select;