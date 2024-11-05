`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 10/22/2024 12:35:47 PM
// Design Name: 
// Module Name: siekoo_rom
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module siekoo_rom (
    input wire [7:0] var,      // Character input (e.g., ASCII or index)
    output reg [6:0] seg  // 7-segment display encoding output
);
    always @(*) begin
    case (var) 
8'd65 : seg = 7'b1011111;    // Character: A
  8'd66 : seg = 7'b1111100;    // Character: B
  8'd67 : seg = 7'b1011000;    // Character: C
  8'd68 : seg = 7'b1011110;    // Character: D
  8'd69 : seg = 7'b1111001;    // Character: E
  8'd70 : seg = 7'b1110001;    // Character: F
  8'd71 : seg = 7'b0111101;    // Character: G
  8'd72 : seg = 7'b1110100;    // Character: H
  8'd73 : seg = 7'b0010001;    // Character: I
  8'd74 : seg = 7'b0001101;    // Character: J
  8'd75 : seg = 7'b1110101;    // Character: K
  8'd76 : seg = 7'b0111000;    // Character: L
  8'd77 : seg = 7'b1010101;    // Character: M
  8'd78 : seg = 7'b1010100;    // Character: N
  8'd79 : seg = 7'b1011100;    // Character: O
  8'd80 : seg = 7'b1110011;    // Character: P
  8'd81 : seg = 7'b1100111;    // Character: Q
  8'd82 : seg = 7'b1010000;    // Character: R
  8'd83 : seg = 7'b0101101;    // Character: S
  8'd84 : seg = 7'b1111000;    // Character: T
  8'd85 : seg = 7'b0011100;    // Character: U
  8'd86 : seg = 7'b0101010;    // Character: V
  8'd87 : seg = 7'b1101010;    // Character: W
  8'd88 : seg = 7'b0010100;    // Character: X
  8'd89 : seg = 7'b1101110;    // Character: Y
  8'd90 : seg = 7'b0011011;    // Character: Z
  8'd49 : seg = 7'b0000110;    // Character: 1
  8'd50 : seg = 7'b1011011;    // Character: 2
  8'd51 : seg = 7'b1001111;    // Character: 3
  8'd52 : seg = 7'b1100110;    // Character: 4
  8'd53 : seg = 7'b1101101;    // Character: 5
  8'd54 : seg = 7'b1111101;    // Character: 6
  8'd55 : seg = 7'b0000111;    // Character: 7
  8'd56 : seg = 7'b1111111;    // Character: 8
  8'd57 : seg = 7'b1101111;    // Character: 9
  8'd48 : seg = 7'b0111111;    // Character: 0
  8'd46 : seg = 7'b0010000;    // Character: .
  8'd44 : seg = 7'b0001100;    // Character: ,
  8'd59 : seg = 7'b0001010;    // Character: ;
  8'd58 : seg = 7'b0001001;    // Character: :
  8'd33 : seg = 7'b1101011;    // Character: !
  8'd63 : seg = 7'b1001011;    // Character: ?
  8'd43 : seg = 7'b1000110;    // Character: +
  8'd45 : seg = 7'b1000000;    // Character: -
  8'd61 : seg = 7'b1001000;    // Character: =
  8'd42 : seg = 7'b1001001;    // Character: *
  8'd35 : seg = 7'b0110110;    // Character: #
  8'd47 : seg = 7'b1010010;    // Character: /
  8'd92 : seg = 7'b1100100;    // Character: \
  8'd175 : seg = 7'b0000001;    // Character: ¯
  8'd95 : seg = 7'b0001000;    // Character: _
  8'd40 : seg = 7'b0111001;    // Character: (
  8'd41 : seg = 7'b0001111;    // Character: )
  8'd39 : seg = 7'b0100000;    // Character: '
  8'd34 : seg = 7'b0100010;    // Character: "
  8'd176 : seg = 7'b1100011;    // Character: °
  8'd60 : seg = 7'b0100001;    // Character: <
  8'd62 : seg = 7'b0000011;    // Character: >
  8'd37 : seg = 7'b0100100;    // Character: %
  8'd64 : seg = 7'b0010111;    // Character: @
endcase
    end
endmodule
