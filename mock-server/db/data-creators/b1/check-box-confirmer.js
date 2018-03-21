const faker = require("faker");

exports.getCheckBoxConfirmer = (id) => {
  const value = faker.random.boolean() ? true : undefined;
  const required = faker.random.boolean();

  let checkBoxConfirmer = {
    id: id,
    type: "check-box-confirmer",
    order: parseInt(id),
    label: "COMPONENT.CHECK_BOX_CONFIRMER.CHECK_BOX_CONFIRMER_LABEL",
    value: value,
    description: "COMPONENT.CHECK_BOX_CONFIRMER.CHECK_BOX_CONFIRMER_DESC",
    required: required,
    disabled: false,
    valid: required ? !!value : true,
    hooks: {
      checkBoxConfirmerBlockDidLoad: "checkBoxConfirmerBlockDidLoad",
      checkBoxConfirmerBlockDidChange: "checkBoxConfirmerBlockDidChange",
    },
  };

  return checkBoxConfirmer;
};
