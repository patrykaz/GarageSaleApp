using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API.Data.Migrations
{
    public partial class _002AddCommentEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastActive",
                table: "AspNetUsers",
                newName: "DateLastActive");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "AspNetUsers",
                newName: "DateCreated");

            migrationBuilder.RenameColumn(
                name: "Deleted",
                table: "Announcements",
                newName: "DateDeleted");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "Announcements",
                newName: "DateCreated");

            migrationBuilder.RenameColumn(
                name: "Accepted",
                table: "Announcements",
                newName: "DateAccepted");

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SenderId = table.Column<long>(type: "bigint", nullable: false),
                    AnnouncementId = table.Column<long>(type: "bigint", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: true),
                    DateSend = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Announcements_AnnouncementId",
                        column: x => x.AnnouncementId,
                        principalTable: "Announcements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AnnouncementId",
                table: "Comments",
                column: "AnnouncementId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_SenderId",
                table: "Comments",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.RenameColumn(
                name: "DateLastActive",
                table: "AspNetUsers",
                newName: "LastActive");

            migrationBuilder.RenameColumn(
                name: "DateCreated",
                table: "AspNetUsers",
                newName: "Created");

            migrationBuilder.RenameColumn(
                name: "DateDeleted",
                table: "Announcements",
                newName: "Deleted");

            migrationBuilder.RenameColumn(
                name: "DateCreated",
                table: "Announcements",
                newName: "Created");

            migrationBuilder.RenameColumn(
                name: "DateAccepted",
                table: "Announcements",
                newName: "Accepted");
        }
    }
}
