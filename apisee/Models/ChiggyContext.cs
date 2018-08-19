using Microsoft.EntityFrameworkCore;

namespace apisee.Models
{
    public class ChiggyContext : DbContext
    {
        public ChiggyContext()
        {
        }

        public ChiggyContext(DbContextOptions<ChiggyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Questions> Questions { get; set; }
        public virtual DbSet<Sets> Sets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=Chiggy;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Questions>(entity =>
            {
                entity.HasKey(e => e.QuestionId);

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.Property(e => e.Choice1).HasColumnName("Choice_1");

                entity.Property(e => e.Choice2).HasColumnName("Choice_2");

                entity.Property(e => e.Choice3).HasColumnName("Choice_3");

                entity.Property(e => e.Choice4).HasColumnName("Choice_4");

                entity.Property(e => e.Choice5).HasColumnName("Choice_5");

                entity.Property(e => e.Choice6).HasColumnName("Choice_6");

                entity.Property(e => e.Choice7).HasColumnName("Choice_7");

                entity.Property(e => e.CorrectAnswerNo).HasColumnName("Correct_Answer_no");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FkSetId).HasColumnName("FK_SetID");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.FkSet)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.FkSetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKSub_sets_SetID");
            });

            modelBuilder.Entity<Sets>(entity =>
            {
                entity.HasKey(e => e.SetId);

                entity.Property(e => e.SetId).HasColumnName("SetID");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.SetName)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}