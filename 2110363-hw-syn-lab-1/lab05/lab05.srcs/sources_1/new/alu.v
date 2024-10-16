`timescale 1ns / 1ps
//-------------------------------------------------------
// File name    : alu.v
// Title        : ALU.
// Library      : nanoLADA
// Purpose      : Computer Architecture
// Developers   : Krerk Piromsopa, Ph. D.
//              : Chulalongkorn University.
module alu(
    output reg [31:0] S,
    output wire z,
    output reg Cout,
    input wire [31:0] A,
    input wire [31:0] B,
    input wire Cin,
    input wire [2:0] alu_ops
    );

assign z=~|S;

always @(A or B or alu_ops)
begin
	case (alu_ops)
	3'b000: begin {Cout,S}=A+B+Cin; end
	3'b001: begin {Cout,S}=A-B; end
	3'b010: begin S=A|B; Cout=0; end
	3'b011: begin S=A&B; Cout=0; end
	3'b100: begin S=A^B; Cout=0; end
	3'b101: begin S=-A; Cout=0; end
	3'b110: begin S=~A; Cout=0; end
	default: begin S=~B; Cout=0; end	
	endcase
end

endmodule