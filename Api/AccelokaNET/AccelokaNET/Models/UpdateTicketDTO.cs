using FluentValidation;
using System;

namespace Acceloka.API.DTOs
{
    using FluentValidation;
    using global::Acceloka.API.DTOs.Acceloka.API.DTOs;
    using System;

    namespace Acceloka.API.DTOs
    {
        public class UpdateTicketDto
        {
            public string NamaKategori { get; set; }
            public string NamaTiket { get; set; }
            public DateTime TanggalEvent { get; set; }
            public decimal Harga { get; set; }
            public int SisaQuota { get; set; }
        }

        public class UpdateTicketDtoValidator : AbstractValidator<UpdateTicketDto>
        {
            public UpdateTicketDtoValidator()
            {
                RuleFor(x => x.NamaKategori)
                    .NotEmpty().WithMessage("Nama kategori tidak boleh kosong.");

                RuleFor(x => x.NamaTiket)
                    .NotEmpty().WithMessage("Nama tiket tidak boleh kosong.");

                RuleFor(x => x.TanggalEvent)
                    .GreaterThan(DateTime.UtcNow).WithMessage("Tanggal event harus di masa depan.");

                RuleFor(x => x.Harga)
                    .GreaterThan(0).WithMessage("Harga harus lebih dari nol.");

                RuleFor(x => x.SisaQuota)
                    .GreaterThanOrEqualTo(0).WithMessage("Sisa kuota tidak boleh negatif.");
            }
        }
    }


    public class UpdateTicketDtoValidator : AbstractValidator<UpdateTicketDto>
    {
        public UpdateTicketDtoValidator()
        {
            RuleFor(x => x.NamaKategori)
                .NotEmpty().WithMessage("Nama kategori tidak boleh kosong.");

            RuleFor(x => x.NamaTiket)
                .NotEmpty().WithMessage("Nama tiket tidak boleh kosong.");

            RuleFor(x => x.TanggalEvent)
                .GreaterThan(DateTime.UtcNow).WithMessage("Tanggal event harus di masa depan.");

            RuleFor(x => x.Harga)
                .GreaterThan(0).WithMessage("Harga harus lebih dari nol.");

            RuleFor(x => x.SisaQuota)
                .GreaterThanOrEqualTo(0).WithMessage("Sisa kuota tidak boleh negatif.");
        }
    }
}
