using Microsoft.EntityFrameworkCore.Migrations;

namespace BoaIdeia.Api.Migrations
{
    public partial class UserAlter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "github_id",
                table: "user",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "google",
                table: "user",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "google_id",
                table: "user",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "stackoverflow_id",
                table: "user",
                maxLength: 500,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "github_id",
                table: "user");

            migrationBuilder.DropColumn(
                name: "google",
                table: "user");

            migrationBuilder.DropColumn(
                name: "google_id",
                table: "user");

            migrationBuilder.DropColumn(
                name: "stackoverflow_id",
                table: "user");
        }
    }
}
