using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddUserTimetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTimetable_AspNetUsers_UserId",
                table: "UserTimetable");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTimetable_TimeTables_TimetableId",
                table: "UserTimetable");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTimetable",
                table: "UserTimetable");

            migrationBuilder.RenameTable(
                name: "UserTimetable",
                newName: "UserTimeTables");

            migrationBuilder.RenameIndex(
                name: "IX_UserTimetable_TimetableId",
                table: "UserTimeTables",
                newName: "IX_UserTimeTables_TimetableId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTimeTables",
                table: "UserTimeTables",
                columns: new[] { "UserId", "TimetableId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserTimeTables_AspNetUsers_UserId",
                table: "UserTimeTables",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTimeTables_TimeTables_TimetableId",
                table: "UserTimeTables",
                column: "TimetableId",
                principalTable: "TimeTables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTimeTables_AspNetUsers_UserId",
                table: "UserTimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTimeTables_TimeTables_TimetableId",
                table: "UserTimeTables");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTimeTables",
                table: "UserTimeTables");

            migrationBuilder.RenameTable(
                name: "UserTimeTables",
                newName: "UserTimetable");

            migrationBuilder.RenameIndex(
                name: "IX_UserTimeTables_TimetableId",
                table: "UserTimetable",
                newName: "IX_UserTimetable_TimetableId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTimetable",
                table: "UserTimetable",
                columns: new[] { "UserId", "TimetableId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserTimetable_AspNetUsers_UserId",
                table: "UserTimetable",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTimetable_TimeTables_TimetableId",
                table: "UserTimetable",
                column: "TimetableId",
                principalTable: "TimeTables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
