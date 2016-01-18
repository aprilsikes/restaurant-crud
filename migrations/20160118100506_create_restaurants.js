
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(table){
    table.increments();
    table.string('name');
    table.string('location');
    table.string('state');
    table.string('cuisine');
    table.integer('rating');
    table.text('bio')
    table.string('image');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
