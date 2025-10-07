from OpenSSL import crypto
import pem
import os

def verify_domain(domain, port=443):
    """
    Verify the certificate chain for a given domain.
    
    Args:
        domain: Domain name to verify (e.g., 'twitter.com')
        port: Port number (default 443 for HTTPS)
    """
    print(f"\n{'='*60}")
    print(f"Verifying certificate for: {domain}")
    print(f"{'='*60}")
    
    # Note: You need to manually download the certificate first using:
    # openssl s_client -connect domain:443 -showcerts > domain_cert.pem
    # Then extract the server cert to target.cert
    # And extract intermediate cert to intermediate.cert
    
    try:
        with open('./target.cert', 'r') as cert_file:
            cert = cert_file.read()
        print("✓ Loaded target certificate")
    except FileNotFoundError:
        print("✗ Error: target.cert not found")
        print(f"  Please save {domain}'s certificate as target.cert")
        return False
    
    try:
        with open('./intermediate.cert', 'r') as int_cert_file:
            int_cert = int_cert_file.read()
        print("✓ Loaded intermediate certificate")
    except FileNotFoundError:
        print("⚠ Warning: intermediate.cert not found")
        print("  Proceeding without intermediate certificate")
        int_cert = None
    
    try:
        pems_list = pem.parse_file('./ca-certificates.crt')
        print(f"✓ Loaded {len(pems_list)} root certificates from CA bundle")
    except FileNotFoundError:
        print("✗ Error: ca-certificates.crt not found")
        return False
    
    trusted_certs = []
    for mypem in pems_list:
        trusted_certs.append(str(mypem))
    
    # Add intermediate certificate if available
    if int_cert:
        trusted_certs.append(int_cert)
    
    # Verify the certificate chain
    verified = verify_chain_of_trust(cert, trusted_certs)
    
    if verified:
        print(f"\n✓ Certificate for {domain} is VALID and TRUSTED")
        print(f"  The certificate chain has been successfully verified.")
    else:
        print(f"\n✗ Certificate for {domain} verification FAILED")
        print(f"  The certificate chain could not be verified.")
    
    print(f"{'='*60}\n")
    return verified


def verify_chain_of_trust(cert_pem, trusted_cert_pems):
    """
    Verify the certificate chain of trust.
    
    Args:
        cert_pem: PEM-encoded certificate to verify
        trusted_cert_pems: List of PEM-encoded trusted certificates
        
    Returns:
        True if certificate is valid, False otherwise
    """
    try:
        certificate = crypto.load_certificate(crypto.FILETYPE_PEM, cert_pem)
        
        # Create and fill a X509Store with trusted certs
        store = crypto.X509Store()
        for trusted_cert_pem in trusted_cert_pems:
            try:
                trusted_cert = crypto.load_certificate(
                    crypto.FILETYPE_PEM, 
                    trusted_cert_pem
                )
                store.add_cert(trusted_cert)
            except Exception as e:
                # Skip invalid certificates in the bundle
                continue
        
        # Create a X509StoreContext with the cert and trusted certs
        # and verify the chain of trust
        store_ctx = crypto.X509StoreContext(store, certificate)
        
        # Returns None if certificate can be validated
        result = store_ctx.verify_certificate()
        
        if result is None:
            return True
        else:
            return False
            
    except Exception as e:
        print(f"  Error during verification: {str(e)}")
        return False


def main():
    """
    Main function to verify certificates for multiple domains.
    """
    print("\n" + "="*60)
    print("Certificate Chain Validation Tool")
    print("="*60)
    
    domains_to_verify = [
        "twitter.com",
        "google.com",
        "www.chula.ac.th",
        "classdeedee.cloud.cp.eng.chula.ac.th"
    ]
    
    print("\nDomains to verify:")
    for i, domain in enumerate(domains_to_verify, 1):
        print(f"  {i}. {domain}")
    
    print("\n" + "="*60)
    print("INSTRUCTIONS:")
    print("="*60)
    print("For each domain, you need to:")
    print("1. Download the certificate:")
    print("   openssl s_client -connect DOMAIN:443 -showcerts 2>/dev/null | \\")
    print("     openssl x509 > target.cert")
    print("2. Download intermediate certificate from AIA if needed")
    print("3. Run this script to verify")
    print("="*60)
    
    # Example verification (you'll need to prepare the cert files)
    print("\nTo verify a domain, prepare the certificate files and call:")
    print("verify_domain('domain.com')")
    
    # Uncomment below to run verification if files are ready
    # for domain in domains_to_verify:
    #     input(f"\nPress Enter when ready to verify {domain}...")
    #     verify_domain(domain)


if __name__ == "__main__":
    main()
    
    # Example usage for a single domain:
    # Make sure you have target.cert, intermediate.cert, and ca-certificates.crt
    # Then uncomment the line below:
    # verify_domain('twitter.com')