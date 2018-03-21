const faker = require("faker");

exports.getDossier = (id) => {
  const section1Required1 = faker.random.boolean();
  const section1Required2 = faker.random.boolean();
  const section1Required3 = faker.random.boolean();
  const section2Required1 = faker.random.boolean();

  let dossier = {
    id: id,
    type: "dossier",
    order: parseInt(id),
    section1: {
      sectionLabel: "COMPONENT.DOSSIER.SECTION1_LABEL",

      label1: "COMPONENT.DOSSIER.SECTION1_VALUE1_LABEL",
      value1: "",
      required1: section1Required1,
      disabled1: false,

      label2: "COMPONENT.DOSSIER.SECTION1_VALUE2_LABEL",
      value2: "",
      required2: section1Required2,
      disabled2: false,

      label3: "COMPONENT.DOSSIER.SECTION1_VALUE3_LABEL",
      value3: true,
      required3: section1Required3,
      disabled3: false,
    },
    section2: {
      sectionLabel: "COMPONENT.DOSSIER.SECTION2_LABEL",

      label1: "COMPONENT.DOSSIER.SECTION2_VALUE1_LABEL",
      value1: "",
      required1: section2Required1,
      disabled1: false,
    },
    valid: true,
    hooks: {
      dossierBlockDidLoad: "dossierBlockDidLoad",
      dossierBlockDidChange: "dossierBlockDidChange",
    },
  };

  return dossier;
};
