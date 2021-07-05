using Microsoft.EntityFrameworkCore.Migrations;

namespace BoaIdeia.Api.Migrations
{
    public partial class NewFieldsUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdOragon",
                table: "user",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsPolitical",
                table: "user",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdOragon",
                table: "user");

            migrationBuilder.DropColumn(
                name: "IsPolitical",
                table: "user");
        }
    }
}
