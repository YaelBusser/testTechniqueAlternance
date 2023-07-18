module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favoris', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      personnage: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      episode: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      citation: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favoris');
  }
};