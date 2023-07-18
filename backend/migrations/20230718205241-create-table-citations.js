module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('citations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      citation: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('citations');
  }
};
