using Microsoft.EntityFrameworkCore.Migrations;

namespace BoaIdeia.Api.Migrations
{
    public partial class ProjectModify : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropIndex(
            //    name: "IX_user_name",
            //    table: "user");

            migrationBuilder.AddColumn<bool>(
                name: "is_privite",
                table: "project",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_privite",
                table: "project");

            //migrationBuilder.CreateIndex(
            //    name: "IX_user_name",
            //    table: "user",
            //    column: "name",
            //    unique: true);
        }
    }
}
