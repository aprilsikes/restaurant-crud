exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table){
    table.increments();
    table.string('reviewer_name');
    table.date('date');
    table.text('review');
    table.integer('rating');
    table.integer('restaurant_id');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
